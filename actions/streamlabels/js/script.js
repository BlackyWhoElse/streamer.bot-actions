var vertical = false;
var type = "";
var current = 0;
var goal = 0;


function updateProgress() {
    checkOrientation();
    setCurrent(current);
    setGoal(goal);
    setPercent(current, goal);
}

function checkOrientation() {
    var classes = $("#progress").attr("class");
    
    if (classes == "vertical") {
        vertical = true;
    }
}

function initGoal() {
    // Check what type of goal is loaded 
    type = document.getElementById('progress').getAttribute("aria-goal-type");

    ws.send(
        JSON.stringify({
            request: "DoAction",
            action: {
                name: "Update Goal " + type ,
            },
            id: "StreamLabelsUpdateGoal",
        })
    );
}

function addToGoal(){

}

function setGoal(goal) {
    $("#goal").text(goal);
}

function getGoal() {
    return $("#goal").text();
}

function setCurrent(current) {
    $("#current").text(current);
}

function getCurrent() {
    return $("#current").text();
}

function setPercent(current, goal) {
    if (vertical) {
        $(".progress-bar").height((current / goal) * 100 + '%');
    } else {
        $(".progress-bar").width((current / goal) * 100 + '%');
    }
}

function calculatePercent() {
    return (current / goal) * 100;
}