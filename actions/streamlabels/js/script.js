var type = "";
var current = 0;
var goal = 0;


function updateProgress() {
    setCurrent();
    setGoal();
    setPercent();
}

function initGoal() {
    // Check what type of goal is loaded 
    type = document.getElementById('progress').getAttribute("aria-goal-type");

    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                name: "Update Goal " + type,
            },
            id: "StreamLabelsUpdateGoal",
        })
    );
}

function addToGoal() {

}

function setGoal() {
    $("#goal").text(goal);
}

function getGoal() {
    return $("#goal").text();
}

function setCurrent() {
    $("#current").text(current);
}

function getCurrent() {
    return $("#current").text();
}

function setPercent() {
    document.getElementById('progress-bar').setAttribute("value", current)
    document.getElementById('progress-bar').setAttribute("max", goal)
}