// General Variables
var prediction;

// Info Variables
var title;
var duration;

// Summery Variables
var totalOutcomes = 0;
var totalPoints = 0;
var totalUsers = 0;

var template_outcome;
var template_winner;

var settings = {
    template: "default",
    websocketURL: "ws://localhost:8080/",
    text: {
        "stringDefaultTitle": `There is no prediction running right now!`,
        "stringSummery": `So far nobody has voted yet`,
        "stringResults": `These are the biggest winners of this prediction`,
    },
    animations: {
        clearDelay: 0,
        // If you plan on disabling with the "Resolved Event" please add an delay before you disable the source that matches this one
        showWinnersTime: 10000,
    },
    showWinners: true,
    winnerAmount: 3,
};


var outcome_wrapper = null;



/**
 * Storing avatars that have been called to save api calls
 * username: imageURL
 */
var avatars = {}

window.addEventListener('load', (event) => {
    loadTemplates();
    $('#title').html(settings.text.stringDefaultTitle);
    connectws();
});

/**
 * This will load all template,css files in theme/{{themename}}
 * Check console for errors if you theme doesn't work
 */
function loadTemplates() {

    //  Loading message templates
    $("#templates").load(`theme/${settings.template}/template.html`, function(response, status, xhr) {
        if (status == "error") {
            var msg = "Sorry but there was an error: ";
            console.error(msg + xhr.status + " " + xhr.statusText);
        }
        console.log(status);
        if (status === "success") {
            // Loading template css
            $('head').append(`<link rel="stylesheet" href="theme/${settings.template}/css/styles.css" type="text/css" />`);

            template_outcome = document.querySelector('#outcome');
            template_winner = document.querySelector('#winner');
        }
    });

}

function connectws() {
    if ("WebSocket" in window) {
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = function() {
        console.debug('Websocket connected');
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "events": {
                "Twitch": [
                    "PredictionCreated",
                    "PredictionUpdated",
                    "PredictionCompleted",
                    "PredictionCanceled",
                    "PredictionLocked"
                ]
            },
            "id": "Predictions"
        }));
    }

    ws.onmessage = function(event) {
        // grab message and parse JSON
        const msg = event.data;
        const data = JSON.parse(msg);

        if (!data.event) {
            return;
        }

        prediction = data.data;

        // check for events to trigger
        switch (data.event.type) {
            case "PredictionCreated":
                CreatePrediction();
                break;
            case "PredictionUpdated":
                UpdatePrediction();
                break;
            case "PredictionLocked":
                // Todo: Add a function here
                break;
            case "PredictionCompleted":
                CompletePrediction(prediction.winning_outcome)
                break;
            case "PredictionCanceled":
                CancelPrediction();
                break;
            default:
                console.log(data.event.type);

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
function CreatePrediction() {
    outcome_wrapper = document.getElementById('outcomes');
    ClearPrediction();


    title = prediction.title;
    $('#prediction .title').html(title);
    $('#prediction .title').attr('id', 'newID');
    (title);
    $('#summery').html(settings.text.stringSummery);

    locks = new Date(prediction.locks_at)    
    start = new Date() 

    duration = locks - start;
    $('#timeleft').css('--timer', Math.floor(duration/1000) + "s");

    $('#results .title').html(settings.text.stringResults);

    prediction.outcomes.forEach(outcome => {
        $("#outcomes").append(renderOutcome(outcome));
    });

    $('#timeleft').addClass("animate");

    $('#results').removeClass("show");
    $('#prediction').addClass("show");

}

function UpdatePrediction() {


    // Check if a prediction is already rendered
    // Then just update the value 
    // If not rerender the whole thing

    if(!outcome_wrapper){
        CreatePrediction();
        console.info("Prediction needed to be re-rendered");
    }


    totalPoints = 0;
    totalUsers = 0;
    index = 0;

    prediction.outcomes.forEach(outcome => {
        updateOutcome(outcome);
    });

    updateSummery();
}

function CancelPrediction() {
    // Remove Outcomes and set everything back to default
    $("#outcomes").empty();
    $('#title').html('There is no Prediction running right now!');
    $('#summery').html('');
    $('#timeleft').css('--timer', "0s");
    $('#prediction').removeClass("show");
}

function CompletePrediction(outcome) {

    if (settings.showWinners === true) {
        ClearPrediction();
        showWinners(outcome);
    } else {
        setTimeout(function() {
            ClearPrediction();
        }, settings.animations.clearDelay);
    }
}


/**
 * Render Outcomes
 * @param {object} outcome
 * @returns
 */
function renderOutcome(outcome) {

    // Get template and populate
    const tpl = template_outcome;

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => outcome[token] || '');
}

/**
 *
 * @param {int} index
 * @param {object} outcome
 */
function updateOutcome(outcome) {
    totalPoints += outcome.channel_points;
    totalUsers += outcome.users;
    $(`#outcome-${index} .points`).html(outcome.channel_points);
    $(`#outcome-${index} .beter`).html(outcome.users);
}

/**
 *
 */
function updateSummery() {
    // Update % based Values
    prediction.outcomes.forEach(outcome => {
        updatePercent(outcome);
    });
    $('#summery').html(`${totalPoints} points have been bet by ${totalUsers} viewers so far`);
}
/**
 *
 * @param {int} index
 * @param {object} outcome
 */
function updatePercent(outcome) {

    var top = { points: 0, name: "" };

    if (outcome.top_predictors) {
        outcome.top_predictors.forEach(predictors => {
            if (top.points < predictors.channel_points_used) {
                top.points = predictors.channel_points_used;
                top.name = predictors.user_name;
            }
        });
    }


    let perc = percentage(outcome.channel_points, totalPoints);
    $(`#${outcome.id} .percent`).html(`${perc}%`);
    $(`#${outcome.id} .percent-bar`).css('--percent', perc + "%");

    $(`#${outcome.id} .points`).html(`${outcome.channel_points}`);
    $(`#${outcome.id} .beter`).html(`${outcome.users}`);
    $(`#${outcome.id} .top`).html(`${top.name}`);
}

/**
 * Render Outcomes
 * @param {object} outcome
 * @returns
 */
function renderWinner(winner) {

    // Get template and populate
    const tpl = template_winner;

    const pattern = /{{\s*(\w+?)\s*}}/g; // {property}
    return tpl.innerHTML.replace(pattern, (_, token) => winner[token] || '');
}


function showWinners(outcome) {

console.debug(outcome);

    // Get the 3 biggest winner
    for (let index = 0; index < outcome.top_predictors.length; index++) {
        if (index === settings.winnerAmount - 1) {
            break;
        }
        const winner = outcome.top_predictors[index];
        const promise = new Promise((resolve, reject) => {
            resolve(getProfileImage(winner.user_name));
        }).then(avatar => {
            winner.avatar = avatar;
            $("#winners").append(renderWinner(winner));
        }).catch(function(error) {
            console.error(error);
        });

        console.debug(winner);
    }

    setTimeout(function() {
        $('#results').removeClass("show");
        $("#winners").html('');
    }, settings.animations.showWinnersTime);
}

/**
 * Readys widget for the next Prediction
 */
function ClearPrediction() {
    $("#outcomes").empty();
    $('#prediction .title').html(settings.text.stringDefaultTitle);
    $('#summery').html('');

    $('#prediction').removeClass("show");
    $('#results').addClass("show");
}

/**
 *
 * @param {int} partialValue
 * @param {int} totalValue
 * @returns int
 */
function percentage(partialValue, totalValue = 0) {
    return Math.round((100 * partialValue) / totalValue);
}

/**
 * Calling decapi.me to recive avatar link as string
 * @param {string} username
 * @returns
 */
async function getProfileImage(username) {

    // Check if avatar is already stored
    if (avatars.username) {
        return `${avatars.username}`;
    }

    return fetch(`https://decapi.me/twitch/avatar/${username}`)
        .then(response => {
            return response.text();
        })
        .then(avatar => {
            avatars[username] = avatar;
            return `${avatar}`;
        });

}