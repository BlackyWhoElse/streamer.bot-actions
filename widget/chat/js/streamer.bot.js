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

    ws.onmessage = async(event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }

        // Custom
        if (wsdata.data.name == "ClearChat") {
            ClearChat();
        }


        // Platforms
        console.debug(wsdata.event.source + ": " + wsdata.event.type);

        if (settings.debug) {
            console.debug(wsdata.data);
        }


        /* Blacklist */
        // User


        if (wsdata.event.type == "ChatMessage" && settings.blacklist.user.includes(wsdata.data.message.displayName) || wsdata.event.source == "RewardRedemption" && settings.blacklist.user.includes(wsdata.data.displayName)) {
            console.info("Blocked message because display name is on blacklist!");
            return;
        }

        // Commands
        if (wsdata.event.type == "ChatMessage" && settings.blacklist.commands == true && wsdata.data.message.message.charAt(0) == "!") {
            console.info("Blocked message because it was a command");
            return;
        }



        switch (wsdata.event.source) {
            case "Twitch":
                switch (wsdata.event.type) {
                    case "ChatMessage":
                        await pushMessage("chatmessage", wsdata.data.message);
                        break;
                    case "ChatMessageDeleted":
                        removeMessage(message.targetMessageId);
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

    ws.onclose = function() {
        console.error("Connection failed!");
        setTimeout(connectws, 10000);
    };
}