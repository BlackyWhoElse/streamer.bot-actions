window.addEventListener('load', (event) => {
    console.log('page is fully loaded');
    connectws();
});

/**
 * Variables
 */
var minCount = 20;
var maxCount = 50;
var minDecoy = 20;
var maxDecoy = 50;
var runners = null;
var correctCount = 0;
var decoys = 0;
var raceProgress = 0;
var winnerUsername = "None"

// Board Vars
var minSpeed = 2;
var maxSpeed = 10;

var minHeight = 55;
var maxHeight = 90;
var style = "pokemon";
var sprites;
var CountSpriteUrl;

var removepath = "C:/Users/BlackyWerSonst/Documents/Gitlab/OBS-Overlays/counting game"

/**
 * Websocket Stuff
 */
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

        // check for events to trigger
        switch (wsdata.data.name) {
            case "Build Game":
                console.log("Get Args from Streamer.Bot");
                clearResultField();
                minCount = parseInt(wsdata.data.arguments.minCount);
                maxCount = parseInt(wsdata.data.arguments.maxCount);
                minDecoy = parseInt(wsdata.data.arguments.minDecoy);
                maxDecoy = parseInt(wsdata.data.arguments.maxDecoy);
                correctCount = parseInt(wsdata.data.arguments.correctCount);
                CountSpriteUrl = wsdata.data.arguments.CountSpriteURL;
                setCountSprite(CountSpriteUrl);
                sprites = wsdata.data.arguments.sprites;
                buildGameLogic();
                break;
            case "Countdown":
                // Display a x secound countdown
            break;
            case "Start Game":
                startRace();
            break;
            case "Clear Game":
                clearResultField();
                break;
            case "Show Winner":
                showWinner(wsdata.data.arguments.user);
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

/****************
 *  Game Logic  *
 ****************/

/**
 * Spawning Objects
 */
function buildGameLogic() {

    decoys = getRandomInt(maxDecoy, minDecoy);

    console.log("Creating " + correctCount + " Elements to count");
    for (let i = 0; i < correctCount; i++) {
        createObjects("count")
    }

    console.log("Creating " + decoys + " Decoys");
    for (let i = 0; i < decoys; i++) {
        createObjects("decoy");
    }

    startRace();
}

/**
 * Create Count Objects
 * @var type string
 * @var useSprite string
 */

function createObjects(type) {

    height = getRandomInt(maxHeight, minHeight);
    speed = getRandomInt(maxSpeed, minSpeed);

    if (type == "count") {
        useSprite = CountSpriteUrl;
    } else {
        useSprite = sprites[getRandomInt(0, sprites.length)];
    }
    // Set SpriteUrl
    spriteVar = spriteUrl(useSprite);

    $("#game-field").append('<div class="runner ' + type + '" style="--runner-speed: ' + speed + 's;--runner-top:' + height + 'vh;"><div class="sprite" style="' + spriteVar + '")"></div></div>');
}

function spriteUrl(sprite) {
    return "--sprite:url('../" + sprite.replaceAll(/\\/g, "/").replace("C:/Users/BlackyWerSonst/Documents/Gitlab/OBS-Overlays/counting game/", "") + "')";
}

function setCountSprite(sprite) {
    // Set CountSpriteUrl
    spriteVar = spriteUrl(sprite);
    // Show preview on screen of what to count
    $("#countSprite").append('<div class="sprite" style="' + spriteVar + '")"></div>');
}

/**
 * Creates an interval
 * Add .run to random element on field
 * to trigger css animation
 */
function startRace() {
    console.log("Start the race");
    raceProgress = 0;
    // Get all runners
    runners = $("#game-field").children();

    // Start Animation of runners
    var interval = setInterval(() => {
        var $d = runners.not(".run");
        var $el = $d.eq(Math.floor(Math.random() * $d.length));

        $el.on("animationend", function() {
            $(this).removeClass('active');
            raceProgress++;
            console.log("Done")
        });

        $el.addClass('run');

        if ($d.length == 1) {
            clearInterval(interval);
            // End Game (wait until all elements are done)
            setTimeout(3000);
        }

    }, Math.floor((Math.random() * 1500) + 500));

    // Tracking Animation Progress
    var progress = setInterval(() => {
        if (raceProgress == (decoys + correctCount)) {
            clearInterval(progress);
            endRace();
        }
    }, 1000);
}

/**
 * Show winner
 * Clear the board
 */
function endRace() {
    // Show Finish animation
    console.log("Race has ended");
    console.log("Start Voting now");
    callForVoting();
}

/**
 * Sends in chat that voting is open
 * Enable Voting command
 */
function callForVoting() {
    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "id": "8ef38869-0d9b-47de-baac-461707d9de94",
            "name": "Answers Enable"
        },
        "id": "201"
    }));
}

function showWinner(winnerUsername) {
    // Delay
    setTimeout(10000);
    // Show Winner (First who picked correct)
    $("#count").append(correctCount);
    $("#winner").append(winnerUsername);
    $("#result").addClass("show");

    $("#gameField").children().remove();
}

/**
 * Delete all Elements
 */
function clearResultField() {
    console.log("Clear Field")
    $("#result").removeClass("show")
    $("#count").empty();
    $("#winner").empty();
}

function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}