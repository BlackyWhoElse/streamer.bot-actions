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
        ws = new WebSocket(settings.websocketURL);
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                request: "Subscribe",
                id: settings.widget,
                events: {
                    raw: ["Action"],
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

    }
};

ws.onclose = function () {
    setTimeout(connectws, 10000);
};
