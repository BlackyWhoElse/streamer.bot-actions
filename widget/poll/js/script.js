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
                BuildPoll();
                break;
            case "Updated Poll":
                // Todo: Check if Poll has been refreshed and lost if so rebuild
                UpdatePoll();
                break;
            case "Completed Poll":
                // Delete all choices after x sec
                // and hide again
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

/**
 * Build Poll Basic structure
 */
function BuildPoll() {
    title = args["poll.Title"];
    $('#poll-title').html(title);
    duration = args["poll.Duration"];
    $('#timeleft').css('--timer', duration + "s");
    choices = args["poll.choices.count"];
    totalVotes = args["poll.totalVotes"];

    // Create Choice entry
    for (let index = 0; index < choices; index++) {
        /**
         * "poll.choice0.bitVotes": 0
​​         * "poll.choice0.rewardVotes": 0
​​​         * "poll.choice0.title": "Choice 1"
         * "poll.choice0.votes": 1
         */
        $("#choices").append('<div id="choice-' + index + '" class="choice"><div class="info"><strong>' + args["poll.choice" + index + ".title"] + '</strong><span>0% (0)</span></div><div class="percent" style="--percent:0%"></div></div>');
    }

    // Show Poll after filling
    $('#poll').css('display', "block");
}

/**
 * Update Choices with live data so it can be animated
 */
function UpdatePoll() {
    totalVotes = args["poll.totalVotes"];

    // Create Choice entry
    for (let index = 0; index < choices; index++) {
        // Update Values 
        perc = percentage(args["poll.choice0.votes"], totalVotes)
        $('#choice-' + index + ' info span').html(perc + "% (" + args["poll.choice0.votes"] + ")");
        $('#choice-' + index + ' percent').css('--percent', perc + "%");
    }
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}