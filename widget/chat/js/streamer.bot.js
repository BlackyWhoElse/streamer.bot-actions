const client = new StreamerbotClient({
    host: '127.0.0.1',
    port: 8080,
    endpoint: '/'
});

const event_types = ["ChatMessage", "Message", "RewardRedemption"];
connectws();
function connectws() {
    console.info("Connecting to Streamer.Bot via StreamerbotClient...");

    client.on('Twitch.ChatMessage', async function ({ event, data }) {
        await handleStreamerbotEvent("Twitch", "ChatMessage", data);
    });

    client.on('Twitch.ChatMessageDeleted', async function ({ event, data }) {
        await handleStreamerbotEvent("Twitch", "ChatMessageDeleted", data);
    });

    client.on('Twitch.RewardRedemption', async function ({ event, data }) {
        await handleStreamerbotEvent("Twitch", "RewardRedemption", data);
    });

    client.on('YouTube.Message', async function ({ event, data }) {
        await handleStreamerbotEvent("YouTube", "Message", data);
    });

    client.on('YouTube.MessageDeleted', async function ({ event, data }) {
        await handleStreamerbotEvent("YouTube", "MessageDeleted", data);
    });

    client.on('YouTube.SuperChat', async function ({ event, data }) {
        await handleStreamerbotEvent("YouTube", "SuperChat", data);
    });
}

async function handleStreamerbotEvent(platform, eventType, data) {
    if (!event_types.includes(eventType)) {
        return;
    }

    if (settings.debug) {
        console.debug("Streamer.Bot Event Data", data);
    }

    // Todo: Check if this is still necessary after version 1.0.5
    let message = normalizeChatData(data, platform);

    const displayName = message && message.displayName ? message.displayName : "";
    const msgText = message && message.messageText ? message.messageText : "";

    const isChatOrMessage = eventType === "ChatMessage" || eventType === "Message";
    const isRewardRedemption = eventType === "RewardRedemption";
    const isBlacklistedUser = settings.blacklist.user.indexOf(message.displayName) !== -1;
    const isCommand = message.messageText && message.messageText.charAt(0) === "!";

    if ((isChatOrMessage && isBlacklistedUser) || (isRewardRedemption && isBlacklistedUser)) {
        console.info("Blocked message from blacklisted user: " + displayName);
        return;
    }

    if (isCommand && settings.blacklist.commands) {
        console.info("Blocked command message: " + msgText);
        return;
    }

    if (data && data.name === "ClearChat") {
        ClearChat();
    }

    if (settings.blacklist.user.indexOf(message.displayName) !== -1) {
        console.info("Blocked message because display name is on blacklist!");
        return;
    }

    if ((eventType === "ChatMessage" || eventType === "Message") && settings.blacklist.commands === true && message.messageText.charAt(0) === "!") {
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
        case "SuperChat":
            await pushMessage(message.platform, message);
            break;
        default:
            console.error("Unknown platform source:", platform);
    }
}
