var ws;

var sbSettings = {
    widget: "streamlabels",
    // The URL to your streamer.bot ws server
    websocketURL: "ws://localhost:8080/",
};


window.addEventListener("load", (event) => {
    checkOrientation();
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
                    "Twitch": [
                        "Follow",
                        "Cheers",
                        "Subs",
                    ],
                    "streamlabs": [
                        "Donation"
                    ],
                    "streamelements": [
                        "Tip"
                    ],
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

        console.debug(wsdata.data);

        switch (wsdata.data.name) {

            case "Update Follower count":
                updateProgress(wsdata.data.arguments.current, wsdata.data.arguments.goal)
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