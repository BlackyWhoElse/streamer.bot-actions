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
var winnerUsername = "None";
var maxRounds = 1;
var currentRound = 0;

// Board Vars
var minSpeed = 2;
var maxSpeed = 10;

var minHeight = 55;
var maxHeight = 90;
var style = "pokemon";
var sprites;
var CountSpriteUrl;


/****************
 *  Game Logic  *
 ****************/

/**
 * Spawning Objects
 */
function initRound() {
    decoys = getRandomInt(maxDecoy, minDecoy);
  
    console.log("Creating " + correctCount + " Elements to count");
    for (let i = 0; i < correctCount; i++) {
      createObjects("count");
    }
  
    console.log("Creating " + decoys + " Decoys");
    for (let i = 0; i < decoys; i++) {
      createObjects("decoy");
    }
  
    // TODO: Display timer on overlay and start it
  
    var timer = setInterval(function () {
      let seconds = parseInt($("#" + id).text());
      seconds--;
      $("#" + id).text(seconds);
  
      if (seconds == 0) {
        clearInterval(timer);
  
        startRace();
      }
    }, 1000);
  
  
  }
  
  /**
   * Hides control overlay and starts the game
   */
  function startRace() {
    console.log("Start the race");
    $(`#overlay`).css("display", "none");
    startRound();
  }
  
  /**
   * Creates an interval
   * Add .run to random element on field
   * to trigger css animation
   */
  function startRound() {
    // Todo: Show what to Count
  
    raceProgress = 0;
    // Get all runners
    runners = $("#game-field").children();
  
    // Start Animation of runners
    var interval = setInterval(() => {
      var $d = runners.not(".run");
      var $el = $d.eq(Math.floor(Math.random() * $d.length));
  
      $el.on("animationend", function () {
        $(this).removeClass("active");
        raceProgress++;
        console.log("Done");
      });
  
      $el.addClass("run");
  
      if ($d.length == 1) {
        clearInterval(interval);
        // End Game (wait until all elements are done)
        setTimeout(3000);
      }
    }, Math.floor(Math.random() * 1500 + 500));
  
    // Tracking Animation Progress
    var progress = setInterval(() => {
      if (raceProgress == decoys + correctCount) {
        clearInterval(progress);
        endRound();
      }
    }, 1000);
  }
  
  /**
   * Show correct count
   * Check if there is another round to be played
   * End Race / Init another round
   */
  function endRound() {
    if (currentRound <= maxRounds) {
      callForVoting();
    }
  
    endRace();
  }
  
  /**
   * Show winner
   * Clear the board
   */
  function endRace() {
    // Show Finish animation
    console.log("Race has ended");
    console.log("Start Voting now");
    //callForVoting();
  }
  
  /**
   * Sends in chat that voting is open
   * Enable Voting command
   */
  function callForVoting() {
    ws.send(
      JSON.stringify({
        request: "DoAction",
        action: {
          id: "8ef38869-0d9b-47de-baac-461707d9de94",
          name: "Answers Enable",
        },
        id: "StreamingStampedeEnableAnswers",
      })
    );
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
    console.log("Clear Field");
    $("#result").removeClass("show");
    $("#count").empty();
    $("#winner").empty();
    $(`#overlay`).css("display", "block");
  }
  
  /***************
   * Sprite Code *
   ***************/
  
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
  
    $("#game-field").append(
      '<div class="runner ' +
        type +
        '" style="--runner-speed: ' +
        speed +
        "s;--runner-top:" +
        height +
        'vh;"><div class="sprite" style="' +
        spriteVar +
        '")"></div></div>'
    );
  }
  
  /**
   * Converts sprite name into url
   * @param {string} sprite
   * @returns
   */
  function spriteUrl(sprite) {
    return (
      "--sprite:url('../" +
      sprite
        .replaceAll(/\\/g, "/")
        .replace(
          "C:/Users/BlackyWerSonst/Documents/Gitlab/OBS-Overlays/counting game/",
          ""
        ) +
      "')"
    );
  }
  
  /**
   * Sets the sprite for counting
   * @param {string} sprite
   */
  function setCountSprite(sprite) {
    // Set CountSpriteUrl
    spriteVar = spriteUrl(sprite);
    // Show preview on screen of what to count
    $("#countSprite").append(
      '<div class="sprite" style="' + spriteVar + '")"></div>'
    );
  }
  
  /***************
   * Player Code *
   ***************/
  var players = {};
  var playerIndex = 1;
  var maxPlayers = 4;
  
  function addPlayer(player) {
    if (maxPlayers >= playerIndex) {
      console.debug(player);
      $(`.player-${playerIndex}.username`).html(player.username);
      $(`.player-${playerIndex}.avatar`).html(`<img src="${player.avatar}"\>`);
      playerIndex++;
    } else {
      console.log("No more space for player");
      // Todo: Disable join command
    }
  }
  
  /***************
   * Helper Code *
   ***************/
  
  function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
  
  function countdown(id) {
    var timer = setInterval(function () {
      let seconds = parseInt($("#" + id).text());
      seconds--;
      $("#" + id).text(seconds);
  
      if (seconds == 0) {
        clearInterval(timer);
        console.info("Timer stoped");
      }
    }, 1000);
  }
  