var ws;

var sbSettings = {
    widget: "flip-a-coin",
    // The URL to your streamer.bot ws server
    websocketURL: "ws://localhost:8080/",
    actions: {
        answer: "e45ca29c-e9a0-4be8-9646-88aaac49f187",
        poll: "b1920115-d202-4d6c-b0e4-a834d078e782",
    },
    pollTimer: 60000,
};

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

    ws.onmessage = async (event) => {

        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }
        console.debug(wsdata);

        result = flipCoin();

        switch (wsdata.data.name) {
            case "FlipCoin":

                // This will map results if an alias was requested
                if (wsdata.data.arguments["tails"]) {
                    sendAnswerInChat(wsdata.data.arguments[result]);
                } else {
                    sendAnswerInChat(result);
                }

                break;


            case "FlipCoinPoll":
                // This will map results if an alias was requested
                setTimeout(function () {
                    if (wsdata.data.arguments["tails"]) {
                        sendAnswerToPoll(wsdata.data.arguments[result]);
                    } else {
                        sendAnswerToPoll(result);
                    }
                }, sbSettings.pollTimer)
                break;
            default:
                console.debug(wsdata.data.name);
                break;
        }

    }

    ws.onclose = function () {
        setTimeout(connectws, 10000);
    };

};

/**
 * Will send a message to Chat with the outcome
 * @param {string} outcome 
 */
function sendAnswerInChat(outcome) {
    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                name: "Announce Coin Flip"
            },
            id: "FlipACoinAnswer",
            args: {
                choice: outcome,
            },
        })
    );
}
/**
 * Will trigger an action that will complete an poll
 * @param {string} outcome 
 */
function sendAnswerToPoll(outcome) {
    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                id: sbSettings.actions.answerPoll
            },
            id: "FlipACoinAnswerPoll",
            args: {
                choice: outcome,
            },
        })
    );
}