/**
 * Websocket Stuff
 */

var poll;

var title;
var duration;
var totalVotes;
var template;
// Milliseconds
var clearDelay = 5000;
var stringDefaultTitle = "There is no poll running right now";


window.addEventListener('load', (event) => {
    $('#title').html(stringDefaultTitle);

    template = document.querySelector('#choice');

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

        if (!data.event) {
            return;
        }

        poll = data.data;

        // check for events to trigger
        switch (data.event.type) {
            case "PollCreated":
                CreatePoll();
                break;
            case "PollUpdated":
                UpdatePoll();
                break;
            case "PollCompleted":
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
        choice.index = index;
        $("#choices").append(renderChoice(choice));
    });

    // Add vs class if there are only to choices and vs is enabled
    if (poll.choices.length === 2) {
        $('#choices').addClass("vs");
    }

    $('#poll').addClass("show");
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

/**
 * Show Winner and add winning animation class
 * @param {object} choice
 */
function ShowWinner(choice) {
    console.debug(choice);
    if (choice.totalVotes != 0) {
        $("#choices").addClass("showWinner");
        $(`#${choice.choice_id}`).css('--percent', 100 + "%");
        $(`#${choice.choice_id}`).addClass("winner");
        $(`#${choice.choice_id} .info`).prepend('<div id="trophy" class="animate__animated animate__infinite animate__tada"></div>');
    }

    setTimeout(function () {
        ClearPoll();
    }, clearDelay);

}

/**
 * Remove choices and reset timer
 */
function ClearPoll() {
        $("#choices").empty();
        $("#choices").removeClass("showWinner");
        $('#timeleft').removeClass("animate");
        $('#title').html(stringDefaultTitle);
        $('#poll').removeClass("show");
}


/**
 * This will render the Choice with everything in it
 * @param {int} index
 * @param {object} choice
 * @returns
 */
function renderChoice(choice) {

    // Get template and populate
    var tpl = template;

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => choice[token] || '');

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