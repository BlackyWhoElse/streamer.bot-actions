/**
 * Websocket Stuff
 */

var poll;

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
    ws.onopen = function () {
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "events": {
                "Twitch": [
                    "PollCreated",
                    "PollUpdated",
                    "PollCompleted",
                ]
            },
            "id": "twitchPolls"
        }));
    }

    ws.onmessage = function (event) {
        // grab message and parse JSON
        const msg = event.data;
        const data = JSON.parse(msg);

        console.debug(data);

        if(!data.event){
            return;
        }

        poll = data.data;

        // check for events to trigger
        switch (data.event.type) {
            case "PollCreated":
                CreatePoll();
                break;
            case "PollUpdated":
                // Todo: Check if Poll has been refreshed and lost if so rebuild
                UpdatePoll();
                break;
            case "PollCompleted":
                // This will add poll.winningChoice
                // Todo: Add a winner screen
                ShowWinner(poll.winningChoice);
                break;
            default:
                console.log(data.event.type);

        }
    };

    ws.onclose = function () {
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

function ShowWinner(choice) {
    console.debug(choice);
    $("#choices").addClass("showWinner");
    $(`#${choice.choice_id}`).css('--percent', 100 + "%");
    $(`#${choice.choice_id}`).addClass("winner");
    ClearPoll();
}

function ClearPoll() {
    setTimeout(function () {
        $("#choices").empty();
        $("#choices").removeClass("showWinner");
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
   <div id="${choice.choice_id}" class="choice choice-${index}" >
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
    $(`.choice-${index} .info span`).html(perc + `% (${choice.total_voters})`);
    $(`.choice-${index} .percent`).css('--percent', perc + "%");
}

function percentage(partialValue, totalValue) {
    return Math.round((100 * partialValue) / totalValue);
}