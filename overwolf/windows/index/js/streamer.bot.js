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
    ws.onopen = function () {
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

    ws.onmessage = function (event) {
        // grab message and parse JSON
        const msg = event.data;
        const wsdata = JSON.parse(msg);

    };

    // Catch Event code and try to reconnect
    ws.onclose = function (event) {
        console.log("Could not connect. Trying to reconnect...")
        setTimeout(connectws, 10000);
    };

}

/**
 * Execute Trigger inside Streamer.bot
 *
 */
function SBsendData(game, data, type) {

    console.info(game + ": " + type, data);

    var args = {};

    switch (type) {
        case 'info':

        var arg = {"game": game};
        Object.assign(arg, JSON.parse(event.data))

            ws.send(JSON.stringify({
                "request": "ExecuteCodeTrigger",
                "triggerName": "event_" + data.feature,
                "args": arg,
                "id": "OverwolfSendInfoData",
            })
            );

            // Game specific event trigger
            ws.send(JSON.stringify({
                "request": "ExecuteCodeTrigger",
                "triggerName": game.replace(" ", "_").toLowerCase() + "_info_" + data.feature,
                "args": arg,
                "id": "OverwolfSendInfoData",
            })
            );
            break;

        case 'event':

            for (const [index, event] of Object.entries(data.events)) {


                var arg = {"game": game,"type": type};
                Object.assign(arg, JSON.parse(event.data))
                
                ws.send(JSON.stringify({
                    "request": "ExecuteCodeTrigger",
                    "triggerName": "event_" + event.name,
                    "args": arg,
                    "id": "OverwolfSendEventData",
                })
                );

                // Game specific event trigger
                ws.send(JSON.stringify({
                    "request": "ExecuteCodeTrigger",
                    "triggerName": game.replace(" ", "_").toLowerCase() + "_event_" + event.name,
                    "args": arg,
                    "id": "OverwolfSendEventData",
                }) 
                );

                console.info("Trigger: " + game.replace(" ", "_").toLowerCase() + "_event_" + event.name);

            }
            break;

        default:
            break;
    }

}
