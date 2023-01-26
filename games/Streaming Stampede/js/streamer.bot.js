/**
 * Websocket Stuff
 */

window.addEventListener("load", (event) => {
  console.log("page is fully loaded");
  connectws();
});


function connectws() {
  if ("WebSocket" in window) {
    ws = new WebSocket("ws://localhost:8080/");
    bindEvents();
    console.log("Websocket done");
  }
}

function bindEvents() {
  ws.onopen = function () {
    ws.send(
      JSON.stringify({
        request: "Subscribe",
        events: {
          general: ["Custom"],
          raw: ["Action", "Sub-Action"],
        },
        id: "StreamingStampede",
      })
    );
  };

  ws.onmessage = function (event) {
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
        initRound();
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
      case "AddPlayer":
        addPlayer(wsdata.data.arguments);
        break;
      default:
        console.log(wsdata.data.name);
    }
  };

  ws.onclose = function () {
    // "connectws" is the function we defined previously
    setTimeout(connectws, 10000);
  };
}
