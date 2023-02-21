var ws;

var sbSettings = {
    widget: "streamlabels",
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
    ws.onmessage = async (event) => {

        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "error") {
            console.debug(wsdata);
            console.error(wsdata.error);
            return;
        } else if ('events' in wsdata || !wsdata.hasOwnProperty("data")) {
            console.info('Message send');
            console.debug(wsdata);
            return;
        }

        console.debug(wsdata);

        switch (wsdata.event.type) {
            // Send by actions via WebsocketBroadcastJson
            case "Custom":
                switch (wsdata.data.name) {
                    case "Update " + type + " Goal":
                        current = wsdata.data.arguments.current;
                        goal = wsdata.data.arguments.goal;
                        updateProgress()
                        break;
                    default:
                        console.debug(wsdata.data.name);
                        break;
                }
                break;
            // Events that are tracked
            case type:
                current++
                updateProgress()
                break;
            default:
                console.debug(wsdata.event.type);
                break;
        }

    }

    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                request: "Subscribe",
                id: sbSettings.widget,
                events: {
                    Twitch: [
                        "Follow",
                        "Cheers",
                        "Subs",
                    ],
                    streamlabs: [
                        "Donation"
                    ],
                    streamelements: [
                        "Tip"
                    ],
                    general: [
                        "Custom"
                    ],
                },
            })
        );

        initGoal();
    };



    ws.onclose = function () {
        setTimeout(connectws, 10000);
    };

};