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
                id: "skipAdSubscribe",
                events: {
                    twitch: [
                        "AdRun",
                        "AdMidRoll"
                    ],
                },
            })
        );
    };

    ws.onmessage = async (event) => {
        const wsdata = JSON.parse(event.data);

        if (wsdata.status == "ok" || wsdata.event.source == null) {
            return;
        }


        switch (data.event.type) {
            /**
             * Name 	    Description
             * adLength 	The length of the ad in seconds
             * adScheduled 	If this ad was a scheduled ad True/False
             */
            case "AdRun":
                initAdRoll(wsdata.data.arguments.adLength);
                break;
            /**
            * Name          	Description
            * ad.commercialId 	The ID of the ad that's about to run
            * ad.jitterTime 	How long until the ad runs (ms)
            * ad.warmupTime 	How long until the ad runs (ms)
            */
            case "AdMidRoll":
                initMidRolAd(wsdata.data.arguments.ad.warmupTime);
                break;
            default:
                console.log(data.event.type);

        }

        // Platforms
        console.debug(wsdata.event.source + ": " + wsdata.event.type);

        if (settings.debug) {
            console.debug(wsdata.data);
        }

    };

    ws.onclose = function () {
        console.error("Connection failed!");
        setTimeout(connectws, 10000);
    };
}
