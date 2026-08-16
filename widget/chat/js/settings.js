/** @typedef {import("./chat-types").ChatMessage} ChatMessage */
/** @typedef {import("./chat-types").ChatBadge} ChatBadge */
/** @typedef {import("./chat-types").ChatEmote} ChatEmote */
/** @typedef {import("./chat-types").ChatReply} ChatReply */
/** @typedef {import("./chat-types").ChatReward} ChatReward */

$('document').ready(function () {

    // Get all checkboxes and the ul element by their IDs
    const checkboxes = $('.checkbox');
    // Add a change event listener to each checkbox
    checkboxes.each(function () {
        $(this).on('change', handleSettingsChange);
    });
});

function handleSettingsChange(event) {
    const switch_data = event.target.dataset;
    let propertyName = event.target.dataset.settingsName;
    let value = event.target.checked;

    console.debug('Checkbox info:', switch_data);

    if (settings.hasOwnProperty(propertyName)) {
        settings[propertyName] = value;
        console.debug(`Updated ${propertyName} to ${value}`);

        switch (propertyName) {
            case "ticker":
                chat.classList.toggle("ticker");
                break;
            case "debug":
                debugMessages();
                break;
            default:
                break;
        }
    } else {
        console.debug(`${propertyName} is not a valid property in the settings object`);
    }


}

/**
 * Gets the Theme name from a Form Element
 * @param {FormData} selectElement
 */
function handleThemeChange(selectElement) {
    const textFieldContainer = document.getElementById('customThemeContainer');
    const customTextField = document.getElementById('customTheme');

    // Reset and hide the text field
    textFieldContainer.style.display = 'none';

    // Check if the selected option is the custom option
    if (selectElement.value === 'custom') {
        // Show the text field
        textFieldContainer.style.display = 'block';
    } else {
        changeTheme(selectElement.value);
        console.log("Load new theme " + selectElement.value)
    }
}

/**
 * # Debug Mode
 * This will constantly generate new messages with random values
 * Name and profile picture are combined, but color, message, and role will be random
 *
 * The debug mode is for a longtime test and themeing.
 *
 */
let dev = false;

function debugMessages() {

    const badges = [
        [{
            "name": "vip",
            "version": "1",
            "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/b817aba4-fad8-49e2-b88a-7cc744dfa6ec/3"
        },
            {
                "name": "subscriber",
                "version": "0",
                "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
            }
        ],
        [{
            "name": "premium",
            "version": "1",
            "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/3"
        }],
        [{
            "name": "broadcaster",
            "version": "1",
            "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3"
        },
            {
                "name": "subscriber",
                "version": "0",
                "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/5d9f2208-5dd8-11e7-8513-2ff4adfae661/3"
            },
            {
                "name": "glhf-pledge",
                "version": "1",
                "imageUrl": "https://static-cdn.jtvnw.net/badges/v1/3158e758-3cb4-43c5-94b3-7639810451c5/3"
            }
        ]
    ];
    const names = [
        {name: "stormen", displayName: "Stormen"},
        {name: "pestily", displayName: "Pestily"},
        {name: "shivfps", displayName: "ShivFPS"},
        {name: "faide", displayName: "Faide"},
        {name: "toastracktv", displayName: "Toastracktv"},
        {name: "esl_csgo", displayName: "ESL_CSGO"},
        {name: "stodeh", displayName: "Stodeh"},
        {name: "spatzetiger", displayName: "Spatzetiger"},
        {name: "burritodyson", displayName: "BurritoDyson"},
    ];
    const msgs = [
        "Welcome",
        "If you ate pasta and antipasta, would you still be hungry?",
        "go on",
        "Oh goodness bunch of sensitive cry babies on twitter!",
        "tell me more",
        "you will be part of it all",
        "Would be, cause Im asking",
        "ask and I will tell",
        "meaning?",
        "Now I am interested, go on",
        "you will be next week",
        "I see you find yourself very interesting",
        "Hi how are you?",
        "I am fantastic and feeling astonishingly glorious",
        "What did you want to be when you grew up?",
        "I feel like I am taking crazy pills!",
        "maybe you are",
        "Sometimes I am",
        "Go on",
        "I drink diced kitten to make other people more interesting",
        "Go on",
        "Is there a spell to become a mermaid that actually works?",
        "Love Spell - To write a successful love letter, rub the entire sheet of stationary with lavender before you start writing",
        "Greetings",
        "hello",
        "wazzup",
        "Which common saying or phrase describes you?",
        "the one on the left",
        "Is the game really over?",
        "Not that there's anything wrong with that",
        "You smell different when you're awake",
        "When a clock is hungry it goes back four seconds",
        "tommorow",
        "Would you rather have one real get out of jail free card or a key that opens any door?",
        "you like yourself alot right",
        "Are you a robot?",
        "How are you?",
        "Happy birthday!",
    ];
    const colors = [
        "#a5cc64",
        "#25c532",
        "#a2c014",
        "#01314f",
        "#4ad4d4",
        "#B33B19",
        "#20dd24",
        "#c859f7",
    ];

    if (!dev) {
        dev = setInterval(() => {
            if (!settings.debug) {
                clearInterval(dev);
                dev = false;
                return;
            }

            // Generating random role
            let r = Math.floor(Math.random() * (4 - 1 + 1) + 1)

            let n = names[Math.floor(Math.random() * names.length)];

            let message_type = Math.floor(Math.random() * badges.length);

            const messageId = makeid(12);
            const messageText = msgs[Math.floor(Math.random() * msgs.length)];
            const now = new Date().toISOString();

            /** @type {ChatMessage} */
            const message = {
                platform: "Twitch",
                type: "Message",

                messageId: messageId,
                msgId: messageId,

                userId: String(27638012),
                userName: n.name,
                displayName: n.displayName,

                messageText: messageText,
                message: messageText,

                color: colors[Math.floor(Math.random() * colors.length)],
                backgroundColor: "",

                classes: [],
                badges: badges[message_type],
                avatar: "https://picsum.photos/200/200",

                roles: [{name: "debug"}],
                role: r,

                isSubscriber: badges[message_type].some((badge) => badge.name === "subscriber"),
                subscriptionTier: badges[message_type].some((badge) => badge.name === "subscriber") ? "1000" : "",

                emotes: [],

                timestamp: now,
                time: now,

                isHighlighted: Math.random() < 0.5,
                isReply: false,

                answer: {
                    userName: "",
                    displayName: "",
                    messageText: "",
                    message: ""
                },

                additional: {
                    bits: 0,
                    channel: n.name,
                    firstMessage: Math.random() < 0.5,
                    hasBits: Math.random() < 0.5,
                    internal: Math.random() < 0.5,
                    isAnonymous: Math.random() < 0.5,
                    isCustomReward: false,
                    isMe: Math.random() < 0.5,
                    monthsSubscribed: 57,
                    username: n.name,
                    user: {
                        name: n.displayName,
                        id: 27638012,
                        profileImageUrl: "https://picsum.photos/200/200"
                    }
                }
            };

            const type = Math.random() < 0.5 ? "chatmessage" : "message";

            pushMessage(type, message);
        }, settings.debugMessageSpeed);
    }
}

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
