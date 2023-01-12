var vertical = false;

function updateProgress(current, goal) {

    current++;

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