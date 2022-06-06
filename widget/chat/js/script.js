/**
 * Message Sample
 * avatar: "https://static-cdn.jtvnw.net/jtv_user_pictures/a88dd690-f653-435e-ae3f-cd312ee5b736-profile_image-300x300.png"
 * badges: Array [ {…}, {…} ]
 * bits: 0
 * channel: "blackywersonst"
 * cheerEmotes: Array []
 * color: "#B33B19"
 * displayName: "Blackywersonst"
 * emotes: Array []
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
            msg = wsdata.data.message;
            add_message();
        } else {
            console.log(['Event not implemented', event]);
        }

    };


    ws.onclose = function() {
        console.log("Reconnecting")
        setTimeout(connectws, 10000);
    };
}

async function add_message() {
    getProfileImage(msg.username).then(data => {

    }).finally(response => {
        $("#chat").append(renderMessage());
    });

}

function renderMessage() {

    if (!msg.color) {
        msg.color = defaultChatColor;
    }

    return `
    <li class="msg">
            <div class="avatar">
                <img src="${msg.avatar}">
            </div>
            <div class="message ">
                <span class="badges"></span>
                <span class="name" style="--userColor:${msg.color}">${msg.displayName}</span>
                <div class="content">${msg.message}</div>
            </div>
        </li>
        `;
}

async function renderBadges() {
    var badges = "";

    msg.badges.forEach(badge => {
        badges.concat(`<img class="${badge.name}" title="${badge.name}" src="${badge.imageUrl}">`)
    });

    return badges;
}

async function getProfileImage(username) {

    // Check if avatar is already stored
    if (avatars.username) {
        return avatars.username;
    }

    await fetch(`https://decapi.me/twitch/avatar/${username}`)
        .then(response => {
            return response.text();
        })
        .then(data => {
            msg.avatar = data;
            avatars[username] = data;
        });

}