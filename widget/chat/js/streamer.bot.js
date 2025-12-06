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


        // First-time connection detection
        if (wsdata.status === "ok" || wsdata.request === "Hello") {
            return;
        }

        if (settings.debug) {
            console.debug("Streamer.Bot Event Data", wsdata.data);
        }

        // Streamer.Bot Custom Commands
        if (wsdata.data.name === "ClearChat") {
            ClearChat();
        }

        // Normalize Message data
        let message = normalizeChatData(wsdata.data, wsdata.event.source);

        // Blacklists
        if (settings.blacklist.user.includes(message.displayName)) {
            console.info("Blocked message because display name is on blacklist!");
            return;
        }

        if (wsdata.event.type === "ChatMessage" && settings.blacklist.commands === true && message.messageText.charAt(0) === "!") {
            console.info("Blocked message because it was a command");
            return;
        }



        switch (wsdata.event.source) {
            case "Twitch":
                switch (wsdata.event.type) {
                    case "ChatMessage":
                        await pushMessage("chatmessage", message);
                        break;
                    case "ChatMessageDeleted":
                        removeMessage(message.messageId);
                        break;
                    case "RewardRedemption":
                        if (template_reward) {
                            pushMessage("reward", wsdata.data);
                        }
                        break;
                    default:
                        break;
                }
                break;

            case "YouTube":
                switch (wsdata.event.type) {
                    case "Message":
                        pushMessage("message", wsdata.data);
                        break;
                    case "MessageDeleted":
                        removeMessage(wsdata.data.targetMessageId);
                        break;
                    default:
                        break;
                }
                break;

            default:
                console.error("Could not find Platform: " + wsdata.event.source)
                break;
        }
    };

    ws.onclose = function () {
        console.error("Connection failed!");
        setTimeout(connectws, 10000);
    };
}
