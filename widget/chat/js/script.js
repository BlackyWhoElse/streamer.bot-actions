/***************************************************
 *              DO NOT EDIT THIS FILE              *
 *        THIS COULD BREAK YOUR WIDGET OR          *
 * BE A PROBLEM IF YOU WANT TO USE A NEWER VERSION *
 ***************************************************/

// General Variables
var ws;
var dev;
var settings = {
    websocketURL: "ws://localhost:8080/",
    debug: false,
    template: "default",
    blacklist: {
        user: [],
        words: [],
        commands: false,
    },
    animations: {
        animation: true,
        hidedelay: 0,
        hideAnimation: "fadeOut",
        showAnimation: "bounceInRight",
    },
    YouTube: {
        defaultChatColor: "#f20000",
    },
    Twitch: {
        defaultChatColor: "#9147ff",
    },
};

var template_twitch;
var template_youtube;
var template_reward;

/**
 * Storing avatars that have been called to save api calls
 * username: imageURL
 */
var avatars = new Map();

window.addEventListener("load", (event) => {
    loadTemplates();
    connectws();

    if (settings.debug) {
        console.debug("Debug mode is enabled");
        debugMessages();
    }
});

/**
 * This will load all template,css files in theme/{{themename}}
 * Check console for errors if you theme doesn't work
 */
function loadTemplates() {
    //  Loading message templates
    $("#templates").load(
        `theme/${settings.template}/template.html`,
        function (response, status, xhr) {
            if (status == "error") {
                var msg = "Sorry but there was an error: ";
                console.error(msg + xhr.status + " " + xhr.statusText);
            }
            if (status === "success") {
                // Loading template css
                $("head").append(
                    `<link rel="stylesheet" href="theme/${settings.template}/css/styles.css" type="text/css" />`
                );

                template_twitch = document.querySelector("#message_twitch");
                template_youtube = document.querySelector("#message_youtube");
                template_reward = document.querySelector("#reward");
            }
        }
    );
}

/**
 * Types of messages
 * - Chatmessage
 * - Reward
 * - Message
 *
 * Default variables
 * - message.msgid
 * - message.username
 * - message.badges
 * - message.avatar
 * - message.time
 * - message.classes
 * @param {*} message
 */
async function pushMessage(type, message) {

    // Adding time variable
    var today = new Date();
    message.time = today.getHours() + ":" + String(today.getMinutes()).padStart(2, "0");

    // Mapping for special types
    switch (type) {

        // Chat message from Twitch
        case "chatmessage":

            // Adding default classes
            message.classes = ["msg"];

            if (!message.color) {
                message.color = settings.Twitch.defaultChatColor;
            }
            if (message.isHighlighted) {
                message.classes.push("highlight");
            }
            if (message.isReply) {
                message.classes.push("reply");
            }
            if (message.isCustomReward) {
                message.classes.push("reward");
            }
            if (message.isMe) {
                message.classes.push("me");
            }
            if (message.subscriber) {
                message.classes.push("subscriber");
            }
            if (message.role === 4) {
                message.classes.push("broadcaster");
            }
            if (message.role === 3) {
                message.classes.push("moderator");
            }
            if (message.role === 2) {
                message.classes.push("vip");
            }

            break;

        // Reward message from Twitch
        case "reward":
            message.msgId = message.id;
            message.title = message.reward.title;
            message.prompt = message.reward.prompt;
            message.displayName = message.user_name;

            // Adding userInput if not defined
            if (!message.user_input) {
                message.message = "";
            } else {
                message.message = message.user_input;
            }

            // Adding default classes
            message.classes = ["reward"];

            break;

        // Message from Youtube
        case "message":


            // Adding default classes
            message.classes = ["msg"];

            message.msgId = message.eventId;
            message.displayName = message.user.name;
            message.userId = message.user.id;

            message.color = settings.YouTube.defaultChatColor;

            if (message.user.isOwner === true) {
                message.classes.push("owner");
            }
            if (message.user.isModerator === true) {
                message.classes.push("moderator");
            }
            if (message.user.isSponsor === true) {
                message.classes.push("sponsor");
            }
            if (message.user.isVerified === true) {
                message.classes.push("verified");
            }

            break;

    }

    const msg = new Promise((resolve, reject) => {
        // Note: This is to prevent a streamer.bot message to not disappear.
        // - This could be a bug and will maybe be removed on a later date.
        if (message.msgId == undefined) {
            console.debug("Message has no ID");
            message.msgId = makeid(6);
        }

        resolve(getProfileImage(type, message));
    })
        .then((avatar) => {
            message.avatar = avatar;
            return renderBadges(message);
        })
        .then((bages) => {
            message.badges = bages;
            return renderEmotes(message);
        })
        .then((msg) => {
            $("#chat").append(renderMessage(type, msg));

            if (settings.animations.hidedelay > 0) {
                removeMessage(message.msgId);
            }
        })
        .then(() => {
            //Prevent clipping
            var currentHeight = 0;
            $("#chat").children().each(function () {
                currentHeight += $(this).outerHeight(true);
            });

            var parentHeight = $('#chat').outerHeight(true);
            var count = 0;
            var $chatLine, lineHeight;

            // Checking the Viewport if Elements are to big the
            // oldest will be deleted after hide animation
            // Issue: https://github.com/BlackyWhoElse/streamer.bot-actions/issues/79
            // Todo: This breaks ticker Themes so need a rework

            while (currentHeight > parentHeight) {
                $chatLine = $('.msg').eq(count);
                lineHeight = $chatLine.outerHeight(true);


                /*$chatLine.addClass("animate__" + settings.animations.hideAnimation);
                $chatLine.bind("animationend", function () {
                    $(this).remove();
                });
                */
                currentHeight -= lineHeight;
                count++;
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

/**
 * Render message with template
 * @param {object} message
 * @returns
 */
function renderMessage(platform, message = {}) {

    if (settings.debug) {
        console.debug("Message Data at the end", message);
    }

    switch (platform) {
        case "chatmessage":
            var tpl = template_twitch;
            break;

        case "message":
            var tpl = template_youtube;
            break;

        case "reward":
            var tpl = template_reward;
            break;

        default:
            break;
    }

    if (settings.animations.animation) {
        message.classes.push("animate__animated");

        if (settings.animations.showAnimation) {
            message.classes.push("animate__" + settings.animations.showAnimation);
        }
    }

    // Blacklist word filter
    if (settings.blacklist.words && platform != "Reward") {
        settings.blacklist.words.forEach((word) => {
            regEx = new RegExp(word, "ig")
            message.message = message.message.replace(regEx, "****");
        });
    }

    message.classes = message.classes.join(" ");

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => message[token] || "");
}

/**
 * Hides a message after an amount of time and deletes it aferwards
 * @param {string} msgId
 */
function removeMessage(msgId) {
    console.log("Hide ID " + msgId + "in " + settings.animations.hidedelay);

    const msg = new Promise((resolve, reject) => {
        delay(settings.animations.hidedelay).then(function () {
            $("#" + msgId).addClass("animate__" + settings.animations.hideAnimation);
            $("#" + msgId).bind("animationend", function () {
                $("#" + msgId).remove();
            });
            resolve();
        });
    }).catch(function (error) {
        console.error(error);
    });
}

/**
 * Creates a markup of all Badges so it can be renderd as one
 * @param {object} message
 * @returns
 */
async function renderBadges(message) {
    var badges = "";

    if (!message.badges) return badges;

    message.badges.forEach((badge) => {
        badges += `<img class="${badge.name}" title="${badge.name}" src="${badge.imageUrl}">`;
    });

    return badges;
}

/**
 * Swaping Emote names for emote images
 * Todo: Add a new way to get image url if its unknown
 * https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_5313d0941014484f9995197017132c33/static/light/3.0
 * @param {object} message
 * @returns
 */

const FFZEffects = [
    // Standard
    "ffzX", "ffzY", "ffzCursed", "ffzW",
    // Premium
    "ffzHyper", "ffzRainbow", "ffzJam",
    "ffzBounce", "ffzSpin", "ffzLeave",
    "ffzArrive", "ffzSlide"
];


async function renderEmotes(message) {

    if (!message.emotes) return message;

    // Check if Message is emote only
    if (message.message.split(" ").length == message.emotes.length) {
        message.classes.push("emoteonly");
    }

    
    // Adding classes for styles 
    Object.entries(message.emotes).forEach(e => {
        const [key, emote] = e;
        var classes = ["emote"];

        if (emote.type == "FFZGlobal" && FFZEffects.includes(emote.name)) {
            classes.push(emote.name);
            message.message = message.message.replace(
                emote.name,
                ``
            );
            delete message.emotes[key]
            // Find the emote with to closed endIndex to this emotes startIndex 
            message.emotes[key - 1]["classes"] = classes;

        }
        else {            
            message.emotes[key]["classes"] = classes;
        }
    });


    // Render
    message.emotes.forEach((emote) => {
        
        console.debug(emote);

        message.message = message.message.replace(
            emote.name,
            `<img class="${emote.classes.join(" ")}" src="${emote.imageUrl}">`
        );
    });

    return message;
}

/**
 * Swaping Emote names for emote images
 * @param {object} message
 * @returns
 */
async function renderYTEmotes(message) {
    // Todo: Find a way to get Emotes https://github.com/BlackyWhoElse/streamer.bot-actions/issues/56

    const yt_emotes = {
        ':yt:': `https://yt3.ggpht.com/m6yqTzfmHlsoKKEZRSZCkqf6cGSeHtStY4rIeeXLAk4N9GY_yw3dizdZoxTrjLhlY4r_rkz3GA=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':oops:': `https://yt3.ggpht.com/qByNS7xmuQXsb_5hxW2ggxwQZRN8-biWVnnKuL5FK1zudxIeim48zRVPk6DRq_HgaeKltHhm=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':buffering:': `https://yt3.ggpht.com/foWgzjN0ggMAA0CzDPfPZGyuGwv_7D7Nf6FGLAiomW5RRXj0Fs2lDqs2U6L52Z4J2Zb-D5tCUAA=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':stayhome:': `https://yt3.ggpht.com/u3QDxda8o4jrk_b01YtJYKb57l8Zw8ks8mCwGkiZ5hC5cQP_iszbsggxIWquZhuLRBzl5IEM2w=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':dothefive:': `https://yt3.ggpht.com/ktU04FFgK_a6yaXCS1US-ReFkLjD22XllcIMOyBRHuYKLsrxpVxsauV1gSC2RPraMJWXpWcY=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':elbowbump:': `https://yt3.ggpht.com/gt39CIfizoIAce9a8IzjfrADV5CjTbSyFKUlLMXzYILxJRjwAgYQQJ9PXXxnRvrnTec7ZpfHN4k=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':goodvibes:': `https://yt3.ggpht.com/6LPOiCw9bYr3ZXe8AhUoIMpDe_0BglC4mBmi-uC4kLDqDIuPu4J3ErgV0lEhgzXiBluq-I8j=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':thanksdoc:': `https://yt3.ggpht.com/Av7Vf8FxIp0_dQg4cJrPcGmmL7v9RXraOXMp0ZBDN693ewoMTHbbS7D7V3GXpbtZPSNcRLHTQw=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':videocall:': `https://yt3.ggpht.com/bP-4yir3xZBWh-NKO4eGJJglr8m4dRnHrAKAXikaOJ0E5YFNkJ6IyAz3YhHMyukQ1kJNgQAo=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':virtualhug:': `https://yt3.ggpht.com/-o0Di2mE5oaqf_lb_RI3igd0fptmldMWF9kyQpqKWkdAd7M4cT5ZKzDwlmSSXdcBp3zVLJ41yg=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':yougotthis:': `https://yt3.ggpht.com/WxLUGtJzyLd4dcGaWnmcQnw9lTu9BW3_pEuCp6kcM2pxF5p5J28PvcYIXWh6uCm78LxGJVGn9g=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':sanitizer:': `https://yt3.ggpht.com/4PaPj_5jR1lkidYakZ4EkxVqNr0Eqp4g0xvlYt_gZqjTtVeyHBszqf57nB9s6uLh7d2QtEhEWEc=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':takeout:': `https://yt3.ggpht.com/ehUiXdRyvel0hba-BopQoDWTvM9ogZcMPaaAeR6IA9wkocdG21aFVN_IylxRGHtl2mE6L9jg1Do=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':hydrate:': `https://yt3.ggpht.com/Plqt3RM7NBy-R_eA90cIjzMEzo8guwE0KqJ9QBeCkPEWO7FvUqKU_Vq03Lmv9XxMrG6A3Ouwpg=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':chillwcat:': `https://yt3.ggpht.com/ZN5h05TnuFQmbzgGvIfk3bgrV-_Wp8bAbecOqw92s2isI6GLHbYjTyZjcqf0rKQ5t4jBtlumzw=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':chillwdog:': `https://yt3.ggpht.com/jiaOCnfLX0rqed1sISxULaO7T-ktq2GEPizX9snaxvMLxQOMmWXMmAVGyIbYeFS2IvrMpxvFcQ=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':elbowcough:': `https://yt3.ggpht.com/kWObU3wBMdHS43q6-ib2KJ-iC5tWqe7QcEITaNApbXEZfrik9E57_ve_BEPHO86z4Xrv8ikMdW0=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':learning:': `https://yt3.ggpht.com/LiS1vw8KUXmczimKGfA-toRYXOcV1o-9aGSNRF0dGLk15Da2KTAsU-DXkIao-S7-kCkSnJwt=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':washhands:': `https://yt3.ggpht.com/66Fn-0wiOmLDkoKk4FSa9vD0yymtWEulbbQK2x-kTBswQ2auer_2ftvmrJGyMMoqEGNjJtipBA=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':socialdist': `https://yt3.ggpht.com/0WD780vTqUcS0pFq423D8WRuA_T8NKdTbRztChITI9jgOqOxD2r6dthbu86P6fIggDR6omAPfnQ=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
        ':shelterin:': `https://yt3.ggpht.com/KgaktgJ3tmEFB-gMtjUcuHd6UKq50b-S3PbHEOSUbJG7UddPoJSmrIzysXA77jJp5oRNLWG84Q=w${yt_emote_width}-h${yt_emote_height}-c-k-nd`,
    };

    message.emotes.forEach((yt_emotes) => {
        message.message = message.message.replace(
            yt_emotes,
            `<img class="emote" src="${emote.imageUrl}">`
        );
    });

    return message;
}

/**
 * Calling decapi.me to recive avatar link as string
 * @param {string} username
 * @returns
 */
async function getProfileImage(type, message) {

    username = "";

    switch (type) {
        case "chatmessage":

            username = message.username;

            // Check if avatar is already stored
            if (avatars.get(username)) {
                return avatars.get(username);
            }

            return fetch(`https://decapi.me/twitch/avatar/${username}`)
                .then((response) => {
                    return response.text();
                })
                .then((avatar) => {
                    avatars.set(username, avatar);
                    return avatar;
                });
            break;

        case "message":
            username = message.user.name;

            // Check if avatar is already stored
            if (avatars.get(username)) {
                return avatars.get(username);
            }

            avatars.set(username, message.user.profileImageUrl);
            return message.user.profileImageUrl;
            break;
    }

}

// Command Code
function ClearChat() {
    $("#chat").html("");
}

// Helper Code
function delay(t, v) {
    return new Promise(function (resolve) {
        setTimeout(resolve.bind(null, v), t);
    });
}

/**
 * # Debug Mode
 * This will constantly generate new messages with random values
 * Name and profile picture are combined but color,message and role will be random
 *
 * The debug mode is for longtime test and themeing.
 *
 */
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
        { name: "stormen", displayName: "Stormen" },
        { name: "pestily", displayName: "Pestily" },
        { name: "shivfps", displayName: "ShivFPS" },
        { name: "faide", displayName: "Faide" },
        { name: "toastracktv", displayName: "Toastracktv" },
        { name: "esl_csgo", displayName: "ESL_CSGO" },
        { name: "stodeh", displayName: "Stodeh" },
        { name: "spatzetiger", displayName: "Spatzetiger" },
        { name: "burritodyson", displayName: "BurritoDyson" },
        { name: "nerdl1ft", displayName: "NerdL1ft" },
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

    dev = setInterval(() => {
        // Generatin random role
        let r = Math.floor(Math.random() * (4 - 1 + 1) + 1)

        let n = names[Math.floor(Math.random() * names.length)];

        let message = {
            bits: 0,
            badges: badges[Math.floor(Math.random() * badges.length)],
            emotes: [],
            channel: n.name,
            color: colors[Math.floor(Math.random() * colors.length)],
            displayName: n.displayName,
            firstMessage: Math.random() < 0.5,
            hasBits: Math.random() < 0.5,
            internal: Math.random() < 0.5,
            isAnonymous: Math.random() < 0.5,
            isCustomReward: false,
            isHighlighted: Math.random() < 0.5,
            isMe: Math.random() < 0.5,
            isReply: Math.random() < 0.5,
            message: msgs[Math.floor(Math.random() * msgs.length)],
            monthsSubscribed: 57,
            msgId: makeid(12),
            role: r,
            subscriber: Math.random() < 0.5,
            userId: 27638012,
            username: n.name,
            time: "19:36",
        };

        pushMessage('chatmessage', message);
    }, 4000);
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
