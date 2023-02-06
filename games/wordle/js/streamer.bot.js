var ws;

var sbSettings = {
    widget: "wordle-on-stream",
    // The URL to your streamer.bot ws server
    websocketURL: "ws://localhost:8080/",
    // Max time to solve the wordle | can be 0 for unlimited time
    gameTimer: 0,
    resetTime: 10000,
    language: "en", // Can be "en" | "de"
};

var currentGuesser;

window.addEventListener("load", (event) => {
    connectws();
});

function connectws() {
    if ("WebSocket" in window) {
        console.log("Connecting to Streamer.Bot");
        ws = new WebSocket(sbSettings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                request: "Subscribe",
                id: sbSettings.widget,
                events: {
                    general: ["Custom"],
                },
            })
        );
    };

    ws.onmessage = async(event) => {

        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }

        console.debug(wsdata.data.arguments);
        currentGuesser = wsdata.data.arguments.user;

        switch (wsdata.data.name) {
            case "Add Guess":
                handleGuess(wsdata.data.arguments.word.toLowerCase());
                break;
            case "Restart Game":

                break;
            default:
                console.debug(wsdata.data.name);
                break;
        }

    }

    ws.onclose = function() {
        setTimeout(connectws, 10000);
    };

};

/**
 * Will send a message to Chat with the outcome
 * @param {boolean} outcome 
 */
function endTheGame(username, outcome) {
    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                name: "End Wordle"
            },
            id: "EndGameWordle",
            args: {
                targetWord,
                outcome,
                username
            },
        })
    );

    setTimeout(() => {
        reset();
    }, sbSettings.resetTime)


}