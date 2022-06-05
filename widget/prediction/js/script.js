// General Variables
var prediction;
var args;

// Info Variables
var title;
var duration;

// Summery Variables
var totalOutcomes = 0;
var totalPoints = 0;
var totalUsers = 0;


// Text Variables
var stringDefaultTitle = `There is no Prediction running right now!`;
var stringSummery = `${totalPoints} points have been bet by ${totalUsers} viewers so far`;

window.addEventListener('load', (event) => {
    $('#title').html(stringDefaultTitle);
    connectws();
});

function connectws() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:8080/");
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = function() {
        console.debug('Websocket connected');
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
                // Todo: Show Winner and maybe the top winner?
                break;
            case "Canceled Prediction":
                CancelPrediction();
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

    title = prediction.title;
    $('#title').html(title);
    $('#summery').html(stringSummery);
    duration = prediction.predictionWindow;
    $('#timeleft').css('--timer', duration + "s");
    index = 0;
    prediction.outcomes.forEach(outcome => {
        index++;
        $("#outcomes").append(renderOutcome(index, outcome));
    });

    $('#timeleft').addClass("animate");
}

function UpdatePrediction() {
    prediction = JSON.parse(args["prediction._json"]);

    totalUsers = 0;
    index = 0;

    prediction.Outcomes.forEach(outcome => {
        index++;
        updateOutcome(index, outcome);
    });

    updateSummery();
}

function CancelPrediction() {
    // Remove Outcomes and set everything back to default
    $("#outcomes").empty();
    $('#title').html('There is no Prediction running right now!');
    $('#summery').html('-');
}

function renderOutcome(index, outcome) {

    var title = outcome.title;
    var total_points = outcome.total_points;
    var total_users = outcome.total_users;

    console.debug(outcome.top_predictors);

    return `
    <div id="outcome-${index}" class="outcome">
                <h3>${title}</h3>
                <div class="info">
                    <div class="stats">
                        <div class="points">${total_points}</div>
                        <div class="win-ratio">-:-</div>
                        <div class="beter">${total_users}</div>
                        <div class="top">0</div>
                    </div>
                    <div class="percent-wrapper">
                        <p class="percent">0%</p>
                        <div class="percent-bar" style="--percent:0"></div>
                    </div>
                </div>
            </div>`;
}

function updateOutcome(index, outcome) {

    totalPoints += outcome.total_points;
    totalUsers += outcome.total_users;
    $(`#outcome-${index} .points`).html(outcome.total_points);
    $(`#outcome-${index} .beter`).html(outcome.total_users);
}

function updateSummery() {
    $('#summery').html(stringSummery);

    // Update % based Values
    index = 0;
    prediction.Outcomes.forEach(outcome => {
        index++;
        updatePercent(index, outcome);
    });
}

function updatePercent(index, outcome) {

    let perc = percentage(outcome.total_points, totalPoints);

    $(`#outcome-${index} .percent`).html(`${perc}`);
    $(`#outcome-${index} .percent-bar`).css('--percent', perc + "%");;
}

function percentage(partialValue, totalValue = 0) {
    return (100 * partialValue) / totalValue;
}