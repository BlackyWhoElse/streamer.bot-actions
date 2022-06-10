/**
 * Message Template data
 * avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/a88dd690-f653-435e-ae3f-cd312ee5b736-profile_image-300x300.png"
 * bits: 0
 * channel: "blackywersonst"
 * color: "#B33B19"
 * displayName: "Blackywersonst"
 * firstMessage: false
 * hasBits: false
 * internal: false
 * isAnonymous: false
 * isCustomReward: false
 * isHighlighted: false
 * isMe: false
 * isReply: false
 * message: "asdas"
 * monthsSubscribed: 57
 * msgId: "337d6353-d43a-4d21-b734-94d04688ff01"
 * role: 4
 * subscriber: true
 * userId: 27638012
 * username: "blackywersonst"
 * time: 19:36
 */

// General Variables
var defaultChatColor = "#fff";
var settings;
var template;

/**
 * Storing avatars that have been called to save api calls
 * username: imageURL
 */
var avatars = {}

// Load settings, template and connect to ws
$.getJSON("js/settings.json", function (json) {
    settings = json;
    template = document.querySelector('#message');
    connectws();
});

function connectws() {
    if ("WebSocket" in window) {
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "id": "obs-chat",
            "events": {
                "general": [
                    "Custom"
                ],
                "Twitch": [
                    "ChatMessage"
                ]
            }
        }));
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.event == null) {
            return;
        }

        // Todo: Add ClearChat function

        if(wsdata.data.name == "ClearChat"){
            ClearChat();
        }

        if (wsdata.event.source === 'Twitch' && wsdata.event.type === 'ChatMessage') {
            add_message(wsdata.data.message);
        } else {
            console.log(['Event not implemented', event]);
        }

    };


    ws.onclose = function () {
        console.log("Reconnecting")
        setTimeout(connectws, 10000);
    };
}

/**
 * Adding content to message and then render it on screen
 * @param {object} message
 */
async function add_message(message) {


    // Adding time variable
    var today = new Date();
    message.time = today.getHours() + ":" + today.getMinutes();

    const msg = new Promise((resolve, reject) => {
        resolve(getProfileImage(message.username));
    }).then(avatar => {
        message.avatar = avatar;
        return renderBadges(message);
    }).then(bages => {
        message.badges = bages;
        return renderEmotes(message);
    })
        .then(msg => {
            $("#chat").append(renderMessage(msg));
            // Todo: Add a fade out option
        }).catch(function (error) {
            console.error(error);
        });
}


/**
 * Render message with template
 * @param {object} message
 * @returns
 */
function renderMessage(message = {}) {

    if (!message.color) {
        message.color = defaultChatColor;
    }

    // Add classes for animation to message
    message.classes = "msg";

    if (settings.animations.animation) {
        message.classes += " animate__animated";

        if (settings.animations.showAnimation) {
            message.classes += " animate__" + settings.animations.showAnimation;
        }

        if (settings.animations.hidedelay != 0) {
            // Todo: Add hide animation after
            // message.classes += " animate__" + settings.animations.hideAnimation;

        }

    }

    // Get template and populate
    var tpl = template;

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => message[token] || '');
}

/**
 * Creates a markup of all Badges so it can be renderd as one
 * @param {object} message
 * @returns
 */
async function renderBadges(message) {
    var badges = "";

    message.badges.forEach(badge => {
        badges += `<img class="${badge.name}" title="${badge.name}" src="${badge.imageUrl}">`;
    });

    return badges;
}

/**
 * Swaping Emote names for emote images
 * @param {object} message
 * @returns
 */
async function renderEmotes(message) {

    message.emotes.forEach(emote => {
        message.message = message.message.replace(emote.name, `<img class="emote "   src="${emote.imageUrl}">`)

    });

    return message;
}

/**
 * Calling decapi.me to recive avatar link as string
 * @param {string} username
 * @returns
 */
async function getProfileImage(username) {

    // Check if avatar is already stored
    if (avatars.username) {
        return `<img src="${avatars.username}"\>`;
    }

    return fetch(`https://decapi.me/twitch/avatar/${username}`)
        .then(response => {
            return response.text();
        })
        .then(avatar => {
            avatars[username] = avatar;
            return `<img src="${avatar}"\>`;
        });

}


function ClearChat() {
    $("#chat").html("");
}
