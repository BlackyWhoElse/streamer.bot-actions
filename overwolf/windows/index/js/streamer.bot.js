/**
 * Variables
 */

var ws = null;
var ip = "ws://localhost:8080/"; // Todo: Add this to a settings(env) variable


/**
 * Adding Websocket after the Page is fully loaded
 * This is only necessary if you are processing other content first
 * and can be skipped if not needed
 */
window.addEventListener('load', (event) => {
    connectws();
});

/**
 * Connect to Websocket Server
 */
function connectws() {
    if ("WebSocket" in window) {
        console.log('Connecting to Streamer.Bot....');
        ws = new WebSocket(ip);
        bindEvents();
    }
}

/**
 * Binding Events after connecting to prevent Errors
 */
function bindEvents() {
    ws.onopen = function() {
        console.log('Connected. Binding Events...');

        // Subscribe here to the events you wanne listen to
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "events": {
                "raw": [
                    "Action",
                    "SubAction"
                ],
                "Custom": []
            },
            "id": "WebsocketDemo"
        }));
    }

    ws.onmessage = function(event) {
        // grab message and parse JSON
        const msg = event.data;
        const wsdata = JSON.parse(msg);

    };

    // Catch Event code and try to reconnect
    ws.onclose = function(event) {
        console.log("Could not connect. Trying to reconnect...")
        setTimeout(connectws, 10000);
    };

}

/**
 * Subscribing to Streamer.Bot Events triggered via C#
 */
function subscribe() {
    ws.send(JSON.stringify({
        "request": "Subscribe",
        "id": "OverwolfGameEvents",
        "events": {
            general: ["Custom"],
        },
    }));
}


/**
 * Gets all available actions inside streamer.bot
 */
function SBgetActions() {
    ws.send(JSON.stringify({
        "request": "GetActions",
        "id": "WSEGetActions",
    }));
}

/**
 * Sends data to Streamer.Bot
 */
function SBsendData(data, type) {

    console.log(data);

    var args = {};

    for (const [key, element] of Object.entries(data)) {
        if (typeof element === 'object') {
            for (const [index, value] of Object.entries(element)) {
                args[index] = value;
            }
        } else {
            args[key] = element;
        }
    }

    // Sends data depending on the type of event to an action
    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "name": "Game" + type
        },
        "args": args,
        "id": "OverwolfSendData"
    }));
}
