function connectws() {
    if ("WebSocket" in window) {
        console.info("Connecting to Streamer.Bot");
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}


const event_types = ["ChatMessage", "Message", "RewardRedemption"]

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

        // Exit on events that are not related to Messages or Rewards
        if (wsdata.request === "Hello" || wsdata.id === "obs-chat" || !event_types.includes(wsdata.event.type)) {
            return;
        }

        if (settings.debug) {
            console.debug("Streamer.Bot Event Data", wsdata.data);
        }


        // Normalize Message data
        let message = normalizeChatData(wsdata.data, wsdata.event.source);

        const eventType = wsdata.event.type;
        const eventSource = wsdata.event.source;
        const displayName = message?.displayName || wsdata.data?.displayName || "";
        const msgText = message?.message || "";

        const isChatOrMessage = eventType === "ChatMessage" || eventType === "Message";
        const isRewardRedemption = eventSource === "RewardRedemption";
        const isBlacklistedUser = settings.blacklist.user.includes(message.displayName);
        const isCommand = message.messageText.startsWith("!");

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
        }

        // Blacklists
        if (settings.blacklist.user.includes(message.displayName)) {
            console.info("Blocked message because display name is on blacklist!");
            return;
        }

        if (wsdata.event.type === "ChatMessage" && settings.blacklist.commands === true && message.messageText.charAt(0) === "!") {
            console.info("Blocked message because it was a command");
            return;
        }


        switch (eventType) {
            case "ChatMessage":
            case "Message":
                await pushMessage(message.platform, message);
                break;
            case "ChatMessageDeleted":
            case "MessageDeleted":
                removeMessage(message.messageId);
                break;
            case "RewardRedemption":
                await pushMessage(message.platform, message);
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
