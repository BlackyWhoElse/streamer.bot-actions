
var currentTimer;
var remainingSeconds;
var timer;
var timerDoneText = "<h1>Countdown is done!</h1>"

window.addEventListener('load', (event) => {
    $('#timeleft').html("00:00");
    connectws();
});

function connectws() {
    if ("WebSocket" in window) {
        ws = new WebSocket("ws://localhost:8080/");
        bindEvents();
    }
}

function bindEvents() {
    ws.onopen = function () {
        console.debug('Websocket connected');
        ws.send(JSON.stringify({
            "request": "Subscribe",
            "events": {
                "general": [
                    "Custom"
                ],
            },
            "id": "100"
        }));
    }

    ws.onmessage = function (event) {
        // grab message and parse JSON
        const msg = event.data;
        const data = JSON.parse(msg);

        if (!data.event) {
            return;
        }

        prediction = data.data;

        // check for events to trigger
        switch (data.event.type) {
            case "Start Timer":
                startTimer(300);
                break;
            default:
                console.log(data.event.type);

        }
    };

    ws.onclose = function () {
        // "connectws" is the function we defined previously
        setTimeout(connectws, 10000);
    };
}

function setupTimer(time, description = "") {

    if (timer) {
        stopTimer();
    }

    // Setting up timer
    currentTimer = time;
    remainingSeconds = time;

    // Add description if set
    $('#description').html(description);

    startTimer()
}

function startTimer() {
    timer = setInterval(function () {

        if (remainingSeconds === 0) {
            clearInterval(timer);
            timerDone();
        }

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = ('0' + remainingSeconds % 60).slice(-2);

        var result = `${minutes} : ${seconds}`;

        $('#timeleft').html(result);

        remainingSeconds--;

    }, 1000)
}

function restartTimer() {
    remainingSeconds = currentTimer;
}

function addTime(time) {
    remainingSeconds = remainingSeconds + time;
}

function stopTimer() {
    clearInterval(timer);
}

function clearTimer() {
    remainingSeconds = 0;
}

function timerDone() {
    $('#description').html(timerDoneText);

    ws.send(JSON.stringify({
        "request": "DoAction",
        "action": {
            "id": "f600902f-0b5d-454d-8487-f51ff8a9e6e8", // Can be found in context menu of action
            "name": "Timer Finished"
        },
        "id": "201"
    }));

}