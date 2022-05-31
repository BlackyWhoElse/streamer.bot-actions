/**
 * Websocket Stuff
 */

var poll;

var title;
var duration;
var choices;
var totalVotes;

window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    connectws();
});


function connectws() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:8080/");
        bindEvents();
        console.log('Websocket done');
    }
}

function bindEvents() {
    ws.onopen = function () {
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "events": {
                "general": [
                    "Custom"
                ],
                "raw": [
                    "Action",
                    "Sub-Action"
                ]
            },
            "id": "1"
        }));
    }

    ws.onmessage = function (event) {
        // grab message and parse JSON
        const msg = event.data;
        const wsdata = JSON.parse(msg);

        //console.debug(event);

        if (wsdata.data == null) {
            return;
        }

        console.debug(wsdata);
        args = wsdata.data.arguments;

        // check for events to trigger
        switch (wsdata.data.name) {
            case "Created Prediction":

                break;
            case "Updated Prediction":

                break;
            case "Locked Prediction":

                break;
            case "Resolved Prediction":

                break;
            case "Canceled Prediction":

                break;
            default:
                console.log(wsdata.data.name);

        }
    };

    ws.onclose = function () {
        // "connectws" is the function we defined previously
        setTimeout(connectws, 10000);
    };
}

function CreatePrediction(){

}

function UpdatePrediction(){

}


function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}