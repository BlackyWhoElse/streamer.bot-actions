/**
 * Message Sample
 * avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/a88dd690-f653-435e-ae3f-cd312ee5b736-profile_image-300x300.png"
 * badges: Array [ {…}, {…} ]
 * bits: 0
 * channel: "blackywersonst"
 * cheerEmotes: Array [{…}, {…}]
 * color: "#B33B19"
 * displayName: "Blackywersonst"
 * emotes: Array [{…}, {…}]
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
 */

// General Variables
var msg;
var defaultChatColor = "#fff";

// username: imageURL
var avatars = {}

window.addEventListener('load', (event) => {
    connectws();
});

function connectws() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:8080/");
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "id": "obs-chat",
            "events": {
                "Twitch": [
                    "ChatMessage"
                ]
            }
        }));
    };

    ws.onmessage = async(event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.event == null) {
            return;
        }

        if (wsdata.event.source === 'Twitch' && wsdata.event.type === 'ChatMessage') {
            add_message(wsdata.data.message);
        } else {
            console.log(['Event not implemented', event]);
        }

    };


    ws.onclose = function() {
        console.log("Reconnecting")
        setTimeout(connectws, 10000);
    };
}

async function add_message(message) {
    const msg = new Promise((resolve, reject) => {
            resolve(getProfileImage(message.username));
        }).then(avatar => {
            message.avatar = avatar;
            return renderBadges(message);
        }).then(bages => {
            message.badges.markup = bages;
            return renderEmotes(message);
        })
        .then(msg => {
            $("#chat").append(renderMessage(msg));
        }).catch(function(error) {
            console.error(error);
            //handle any error that may occur before this point
        });
}

function renderMessage(message) {

    if (!message.color) {
        message.color = defaultChatColor;
    }

    return `
    <li class="msg">
            <div class="avatar">
                <img src="${message.avatar}">
            </div>
            <div class="message ">
                <span class="badges">${message.badges.markup}</span>
                <span class="name" style="--userColor:${message.color}">${message.displayName}</span>
                <div class="content">${message.message}</div>
            </div>
        </li>
        `;
}

async function renderBadges(message) {
    var badges = "";

    message.badges.forEach(badge => {
        badges += `<img class="${badge.name}" title="${badge.name}" src="${badge.imageUrl}">`;
    });

    return badges;
}

async function renderEmotes(message) {

    message.emotes.forEach(emote => {
            message.message = message.message.replace(emote.name, `<img class="emote "   src="${emote.imageUrl}">`)

    });

    return message;
}

async function getProfileImage(username) {

    // Check if avatar is already stored
    if (avatars.username) {
        return avatars.username;
    }

    return fetch(`https://decapi.me/twitch/avatar/${username}`)
        .then(response => {
            return response.text();
        })
        .then(avatar => {
            avatars[username] = avatar;
            return avatar;
        });

}