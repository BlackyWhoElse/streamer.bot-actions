/**
 * Websocket Stuff
 */

var prediction;
var args;

var title;
var duration;
var totalOutcomes;
var totalPoints;

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
    ws.onopen = function() {
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

    ws.onmessage = function(event) {
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
                CreatePrediction();
                break;
            case "Updated Prediction":
                UpdatePrediction();
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

    ws.onclose = function() {
        // "connectws" is the function we defined previously
        setTimeout(connectws, 10000);
    };
}

function CreatePrediction() {

    let prediction = JSON.parse(args["prediction._json"]);

    title = prediction.Title;
    $('#title').html(title);
    $('#summery').html(`0 Punkte wurden von 0 Teilnehmern bis jetzt gewettet`);
    duration = prediction.PredictionWindow;
    $('#timeleft').css('--timer', duration + "s");
    index = 0;
    prediction.Outcomes.forEach(outcome => {
        index++;
        $("#outcomes").append(renderOutcome(index, outcome));
    });

}

function UpdatePrediction() {
    let prediction = JSON.parse(args["prediction._json"]);

    $('#summery').html(`0 Punkte wurden von 0 Teilnehmern bis jetzt gewettet`);

    index = 0;
    prediction.Outcomes.forEach(outcome => {
        index++;
        updateOutcome(index, outcome);
    });
}

function renderOutcome(index, outcome) {

    var title = outcome.Title;
    var total_points = outcome.total_points;
    var total_users = outcome.total_users;

    return `
    <div id="outcome-${index}" class="outcome">
                <h3>${title}</h3>
                <div class="info">
                    <div class="stats">
                        <div class="points">${total_points}</div>
                        <div class="win-ratio">-:-</div>
                        <div class="beter">${total_users}</div>
                        <div class="top"></div>
                    </div>
                    <div class="percent-wrapper">
                        <p class="percent">0%</p>
                        <div class="percent-bar" style="--percent:0"></div>
                    </div>
                </div>
            </div>`;
}

function updateOutcome(index, outcome){
    $(`#outcome-${index} .points`).html(outcome.total_points);
    $(`#outcome-${index} .beter`).html(outcome.total_users);
}

function updateSummery(){

}


function percentage(partialValue, totalValue = 0) {
    return (100 * partialValue) / totalValue;
}