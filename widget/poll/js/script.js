/**
 * Websocket Stuff
 */

var poll;
var args;

var title;
var duration;
var totalVotes;

// Milliseconds
var clearDelay = 5000;
var stringDefaultTitle = "There is no poll running right now";


/**
 * DO NOT EDIT BELOW IF YOU DONT KNOW WHAT YOU ARE DOING
 */

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

        if (wsdata.data == null) {
            return;
        }

        console.debug(wsdata);
        args = wsdata.data.arguments;
        poll = JSON.parse(args["poll._json"]);

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
                // This will add poll.winningChoice
                // Todo: Add a winner screen
                ClearPoll();
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

/**
 * Action Controller Functions
 */
function CreatePoll() {
    title = poll.title;
    $('#title').html(title);
    duration = poll.duration;
    $('#timeleft').css('--timer', duration + "s");
    totalVotes = poll.totalVotes;

    index = 0;
    poll.choices.forEach(choice => {
        index++;
        $("#choices").append(renderChoice(index, choice));
    });

    $('#timeleft').addClass("animate");

}

function UpdatePoll() {
    totalVotes = poll.totalVotes;
    // Create Choice entry
    index = 0;
    poll.choices.forEach(choice => {
        index++;
        // Update Values
        updateChoice(index, choice);
    });
}

function ShowWinner() {

}

function ClearPoll() {
    setTimeout(function() {
        $("#choices").empty();
        $('#timeleft').removeClass("animate");
        $('#title').html(stringDefaultTitle);
    }, clearDelay);
}



/**
 * This will render the Choice with everything in it
 * @param {int} index 
 * @param {object} choice 
 * @returns 
 */
function renderChoice(index, choice) {
    return `
   <div id="choice-${index}" class="choice" >
    <div class="info">
    <strong>${choice.title}</strong><span>0% (0)</span>
    </div>
    <div class="percent" style="--percent:0%;"></div>
   </div>`;

}

/**
 * Updates a choice with new data to animate 
 * percentige bar and how many votes have been cast
 * @param {int} index 
 * @param {object} choice 
 */
function updateChoice(index, choice) {
    perc = percentage(choice.total_voters, totalVotes)
    $(`#choice-${index} .info span`).html(perc + `% (${choice.total_voters})`);
    $(`#choice-${index} .percent`).css('--percent', perc + "%");
}

function percentage(partialValue, totalValue) {
    return (100 * partialValue) / totalValue;
}