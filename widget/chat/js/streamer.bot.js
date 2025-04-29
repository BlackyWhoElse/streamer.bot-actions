function connectws() {
    if ("WebSocket" in window) {
        console.info("Connecting to Streamer.Bot");
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                request: "Subscribe",
                id: "obs-chat",
                events: {
                    general: ["Custom"],
                    Twitch: ["ChatMessage", "ChatMessageDeleted", "RewardRedemption"],
                    YouTube: ["Message", "MessageDeleted", "SuperChat"],
                },
            })
        );
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);
    
        if (wsdata.status === "ok" || !wsdata.event?.source) {
            return;
        }
    
        if (settings.debug) {
            console.debug("Streamer.Bot Event Data", wsdata.data);
        }
    
        const eventType = wsdata.event.type;
        const eventSource = wsdata.event.source;
        const message = wsdata.data?.message;
        const displayName = message?.displayName || wsdata.data?.displayName || "";
        const msgText = message?.message || "";
    
        const isChatOrMessage = eventType === "ChatMessage" || eventType === "Message";
        const isRewardRedemption = eventSource === "RewardRedemption";
        const isBlacklistedUser = settings.blacklist.user.includes(displayName);
        const isCommand = msgText.startsWith("!");
    
        // Block blacklisted users
        if ((isChatOrMessage && isBlacklistedUser) || (isRewardRedemption && isBlacklistedUser)) {
            console.info(`Blocked message from blacklisted user: ${displayName}`);
            return;
        }
    
        // Block commands
        if (isCommand && settings.blacklist.commands) {
            console.info(`Blocked command message: ${msgText}`);
            return;
        }
    
        // Streamer.Bot Custom Commands
        if (wsdata.data.name === "ClearChat") {
            ClearChat();
            return;
        }
    
        // Handle platforms and events
        // Todo: Normalize message structure to simplify this logic
        switch (eventSource) {
            case "Twitch":
                switch (eventType) {
                    case "ChatMessage":
                        await pushMessage("chatmessage", message);
                        break;
                    case "ChatMessageDeleted":
                        removeMessage(wsdata.data.targetMessageId);
                        break;
                    case "RewardRedemption":
                        if (template_reward) {
                            pushMessage("reward", wsdata.data);
                        }
                        break;
                }
                break;
    
            case "YouTube":
                switch (eventType) {
                    case "Message":
                        pushMessage("message", wsdata.data);
                        break;
                    case "MessageDeleted":
                        removeMessage(wsdata.data.targetMessageId);
                        break;
                }
                break;
    
            default:
                console.error("Unknown platform source:", eventSource);
        }
    };

    ws.onclose = function () {
        console.error("Connection failed!");
        setTimeout(connectws, 10000);
    };
}
