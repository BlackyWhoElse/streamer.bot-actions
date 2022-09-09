var idle;

var settings = {
    animationTime: 2,
    returnToIdle: 100,
}


function flipCoin() {

    $("#coin").removeClass("idle");
    $("#coin").css("animation", "");


    // Reseting timer for idle animation
    if (idle) {
        clearTimeout(idle);
    }

    // Heads or tails    
    if (Math.floor(Math.random() * 2)) {
        setTimeout(function () {
            $("#coin").css("animation", `spin-heads ${settings.animationTime}s ease-in-out forwards`);
        }, 100);
        outcome = "heads";
    }
    else {
        setTimeout(function () {
            $("#coin").css("animation", `spin-tails ${settings.animationTime}s ease-in-out forwards`);
        }, 100);
        outcome = "tails";
    }

    // Go back to idle animation
    if (settings.returnToIdle > 0) {
        idle = setTimeout(function () {
            $("#coin").css("animation", "");
            $("#coin").addClass("idle");
        }, ((settings.returnToIdle + settings.animationTime) * 1000));
    }

    return outcome;
}
