function connectws() {
    if ("WebSocket" in window) {
        console.info("Connecting to Streamer.Bot");
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                request: "Subscribe",
                id: "obs-chat",
                events: {
                    Twitch: [],
                    YouTube: [],
                },
            })
        );
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }

        if (settings.debug) {
            console.debug("Streamer.Bot Event Data", wsdata.data);
        }

    };

    ws.onclose = function () {
        console.error("Connection failed!");
        setTimeout(connectws, 10000);
    };
}
