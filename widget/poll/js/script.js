/**
 * Websocket Stuff
 */

var poll;
var args;

var title;
var duration;
var choices;
var totalVotes;

var stringDefaultTitle = "There is no poll running right now";

window.addEventListener('load', (event) => {
    $('#title').html(stringDefaultTitle);
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
            case "Created Poll":
                CreatePoll();
                break;
            case "Updated Poll":
                // Todo: Check if Poll has been refreshed and lost if so rebuild
                UpdatePoll();
                break;
            case "Completed Poll":
                ClearPool();
                break;
            case "Terminated Poll":
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


function CreatePoll() {
    title = args["poll.Title"];
    $('#title').html(title);
    duration = args["poll.Duration"];
    $('#timeleft').css('--timer', duration + "s");
    choices = args["poll.choices.count"];
    totalVotes = args["poll.totalVotes"];

    // Create Choice entrys
    for (let index = 0; index < choices; index++) {
        $("#choices").append(renderChoice(index, args[`"poll.choice${index}.title"`]));
    }

    // Show Poll after filling
    $('#poll').css('display', "block");
}

function UpdatePoll() {
    totalVotes = args["poll.totalVotes"];

    // Create Choice entry
    for (let index = 0; index < choices; index++) {
        // Update Values
        updateChoice(index, args["poll.choice0.votes"]);
    }
}

function ClearPool() {
    $("#choices").empty();
}

function renderChoice(index, title) {
    return `
   <div id="choice-${index}" class="choice">
    <div class="info">
    <strong>${title}</strong><span>0% (0)</span>
    </div>
    <div class="percent" style="--percent:0%"></div>
   </div>`;

}

function updateChoice(index, votes) {
    perc = percentage(args["poll.choice0.votes"], totalVotes)
    $(`#choice-${index} info span`).html(perc + `% (${votes})`);
    $(`#choice-${index} percent`).css('--percent', perc + "%");
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}