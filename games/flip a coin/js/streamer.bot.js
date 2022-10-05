var ws;

var sbSettings = {
    widget: "flip-a-coin",
    // The URL to your streamer.bot ws server
    websocketURL: "ws://localhost:8080/",
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

    ws.onmessage = async(event) => {

        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }
        console.debug(wsdata);

        switch (wsdata.data.name) {
            case "FlipCoin":
                result = flipCoin();
                sendAnswerInChat(wsdata.data.arguments[result]);
                break;
            case "FlipCoinPoll":
                // Create a poll wait for poll to finish and then flip the coin
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



function sendAnswerInChat(outcome) {
    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                name: "FAC - Answer",
            },
            id: "FlipACoinAnswer",
            args: {
                choice: outcome,
            },
        })
    );
}

function createPoll(heads, tails) {
    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                name: "FAC - Create Poll",
            },
            id: "FlipACoinPoll",
            args: {
                choice1: heads,
                choice2: tails,
            },
        })
    );
}