import { kGameClassIds, kGamesFeatures } from '../../../scripts/constants/games-features.js';

var onErrorListener, onInfoUpdates2Listener, onNewEventsListener;
var gameFeatures;

function registerEvents() {
    console.info("INFO: Register Events")

    onErrorListener = function(info) {
        console.log("Error: " + JSON.stringify(info));
    }

    onInfoUpdates2Listener = function(info) {
        //console.log("Info UPDATE: " + JSON.stringify(info));
        SBsendData(info, "Info");
    }

    onNewEventsListener = function(info) {
        //console.log("EVENT FIRED: " + JSON.stringify(info));
        SBsendData(info, "Event");
    }

    // general events errors
    overwolf.games.events.onError.addListener(onErrorListener);

    // "static" data changed (total kills, username, steam-id)
    // This will also be triggered the first time we register
    // for events and will contain all the current information
    overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates2Listener);
    // an event triggered
    overwolf.games.events.onNewEvents.addListener(onNewEventsListener);
}

function unregisterEvents() {
    console.info("INFO: Unregister Events")
    overwolf.games.events.onError.removeListener(onErrorListener);
    overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2Listener);
    overwolf.games.events.onNewEvents.removeListener(onNewEventsListener);
}

/**
 * Check if a supported Game has been launched
 */
function gameLaunched(gameInfoResult) {
    if (!gameInfoResult) {
        return false;
    }

    if (!gameInfoResult.gameInfo) {
        return false;
    }

    if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
        return false;
    }

    if (!gameInfoResult.gameInfo.isRunning) {
        return false;
    }

    if (!kGameClassIds.includes(gameInfoResult.gameInfo.classId)) {
        return false;
    }

    console.log("Started supported Game: " + gameInfoResult.gameInfo.title);
    gameFeatures = kGamesFeatures.get(gameInfo.classId);
    return true;

}

/**
 * Check if a supported Game is running
 * @param {*} gameInfo 
 * @returns 
 */
function gameRunning(gameInfo) {

    if (!gameInfo) {
        return false;
    }

    if (!gameInfo.isRunning) {
        return false;
    }

    // NOTE: we divide by 10 to get the game class id without it's sequence number
    if (Math.floor(gameInfo.id / 10) != 7764) {
        return false;
    }

    // 
    if (kGameClassIds.includes(gameInfo.classId)) {
        gameFeatures = kGamesFeatures.get(gameInfo.classId);
        return true;
    }


}


function setFeatures() {
    overwolf.games.events.setRequiredFeatures(gameFeatures, function(info) {
        if (info.status == "error") {
            //console.log("Could not set required features: " + info.reason);
            //console.log("Trying in 2 seconds");
            window.setTimeout(setFeatures, 2000);
            return;
        }

        console.log("Set required features:");
        console.log(JSON.stringify(gameFeatures));
    });
}


// Start here
overwolf.games.onGameInfoUpdated.addListener(function(res) {
    //console.log("onGameInfoUpdated: " + JSON.stringify(res));
    if (gameLaunched(res)) {
        unregisterEvents();
        registerEvents();
        setTimeout(setFeatures, 1000);
    }
});

overwolf.games.getRunningGameInfo(function(res) {
    if (gameRunning(res)) {
        registerEvents();
        setTimeout(setFeatures, 1000);
    }
    console.log("getRunningGameInfo: " + JSON.stringify(res));
});