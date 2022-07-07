var poll;

var title;
var duration;
var totalVotes;
var template;

var settings = {
    websocketURL: "ws://localhost:8080/",
    text: {
        "stringDefaultTitle": `There is no poll running right now`,
    },
    animations: {
        showWinnerTime: 15000,
        hideLoosers: true,
    },
};

window.addEventListener('load', (event) => {
    $('#title').html(settings.text.stringDefaultTitle);
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

        if (!data.event) {
            return;
        }

        poll = data.data;

        // check for events to trigger
        switch (data.event.type) {
            case "PollCreated":
                PollCreated();
                break;
            case "PollUpdated":
                PollUpdated();
                break;
            case "PollCompleted":
                console.debug(poll);
                PollCompleted(poll.winningChoice);
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
function PollCreated() {

    clearPoll();

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

/**
 * Updates each choice on Update
 */
function PollUpdated() {
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
 * After the set delay it will clear the pool and hide it
 * @param {object} choice
 */
function PollCompleted(winner) {
    // If no vote has been casted it will show
    if (winner.total_voters === 0) {

        $(`#choices`).addClass("noVotes");

        setTimeout(function () {
            $(`#choices`).removeClass("noVotes");
            clearPoll();
        }, settings.animations.showWinnerTime);
        return;
    }

    const winners = [];

    // Check if another choice has the same amount of votes
    // Note: This has to be done because Streamer.Bot only gives one winner
    poll.choices.forEach(choice => {
        if (choice.votes.total === winner.total_voters) {
            showWinner(choice);
        }
    });

    setTimeout(function () {
        clearPoll();
    }, settings.animations.showWinnerTime);

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


function showWinner(choice) {
    $("#choices").addClass("showWinner");
    $(`#${choice.choice_id}`).css('--percent', 100 + "%");
    $(`#${choice.choice_id}`).addClass("winner");
    $(`#${choice.choice_id} .info`).prepend('<div id="trophy" class="animate__animated animate__infinite animate__tada"></div>');
};

/**
 * Remove choices and reset timer
 */
function clearPoll() {
    $("#choices").empty();
    $("#choices").removeClass("showWinner");
    $('#timeleft').removeClass("animate");
    $('#title').html(settings.text.stringDefaultTitle);
    $('#poll').removeClass("show");
}


function percentage(partialValue, totalValue) {
    return Math.round((100 * partialValue) / totalValue);
}