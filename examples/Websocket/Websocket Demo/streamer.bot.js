/**
 * Variables
 */

var ws = null;
var ip = "ws://localhost:8080/";


/**
 * Adding Websocket after the Page is fully loaded
 * This is only nessesary if you are processing other content first
 * and can be skiped if not needed
 */
window.addEventListener('load', (event) => {
    console.log('Page has been fully loaded');
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
                "Custom":[]
            },
            "id": "100"
        }));
    }

    ws.onmessage = function(event) {
        // grab message and parse JSON
        const msg = event.data;
        const wsdata = JSON.parse(msg);

        console.debug(wsdata);

        if (wsdata.event == "Raw" && wsdata.event.type == "Action") {
            // Checking for Action names
            switch (wsdata.data.name) {
                case "Websocket Test":
                    console.log("Websocket Test ran");
                    break;
                default:
                    console.log(wsdata.data.name);
            }
        }
    };

    // Catch Event code and try to reconnect
    ws.onclose = function(event) {
        console.log("Could not connect. Trying to reconnect...")
        setTimeout(connectws, 10000);
    };

}

/**
 * Example: Subscribe
 */
function subscribe() {
    ws.send(JSON.stringify({
        "request": "Subscribe",
        "id": "100",
        "events": {
            "Twitch": [
                "Follow",
                "Cheer",
                "Sub",
                "Resub",
                "GiftSub",
                "GiftBomb"
            ]
        },
    }));
}

/**
 * Example: UnSubscribe
 */
function unSubscribe() {
    ws.send(JSON.stringify({
        "request": "UnSubscribe",
        "id": "101",
        "events": {
            "Twitch": [
                "Follow",
                "Cheer",
                "Sub",
                "Resub",
                "GiftSub",
                "GiftBomb"
            ]
        },
    }));
}

/**
 * Example: GetEvents
 */
function getEvents() {
    ws.send(JSON.stringify({
        "request": "GetEvents",
        "id": "102",
    }));
}

/**
 * Example: GetActions
 */
function getActions() {
    ws.send(JSON.stringify({
        "request": "GetActions",
        "id": "200",
    }));
}

/**
 * Example: DoAction
 */
function doAction() {
    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "id": "af252804-ed46-49f8-bba9-9cd447c49d99", // Can be found in context menu of action
            "name": "Websocket Test"
        },
        "args": {
            "argument": "Max Mustermann",
        },
        "id": "201"
    }));
}