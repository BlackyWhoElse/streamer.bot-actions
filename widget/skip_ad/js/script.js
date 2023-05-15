var skips = 3;
var time;
var duration;

/**
 * Twitch Variables
 */
var AUTHORIZATION_BEARER = "";
var BROADCASTER_ID = "27638012";
var SHA256_HASH = "";

function initMidRolAd(warmupTime){
  duration = adLength;
  time = warmupTime;
  startTimer();
}

function initAdRoll(adLength) {
  duration = adLength;
  startAd();
}
/**
 * Show overlay for AdMidRoll
 */
function startTimer() {
  $('#timer').html(time);
  $('#skip-progress').attr("max", time);
  $('#skip-container').addClass("show");
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (time <= 0) {
    clearInterval(timer);
    stopTimer();
    return;
  }
  time -= 1;
  $('#timer').html(time);
  $('#skip-progress').val(time);
}

function stopTimer() {
  console.log("Timer finisched");
  // TODO: Check if the ad should be skipped
  startAd();
}


/**
 * Show overlay for AdRun
 */
function startAd() {
  $('#skip-container').removeClass("show");

  $('#ad-duration').addClass("show");
  progress = setInterval(updateprogress, 1000);
}

/**
 * Outdated Function
 */
function skipAd() {

  const url = "https://gql.twitch.tv/gql#origin=twilight";

  const options = {
    headers: {
      Authorization: AUTHORIZATION_BEARER
    },
    body: {
      "operationName": "SnoozeAd",
      "variables": {
        "input": {
          "targetChannelID": BROADCASTER_ID,
          "snoozeDuration": 300
        }
      },
      "extensions": {
        "persistedQuery": {
          "version": 1,
          "sha256Hash": SHA256_HASH
        }
      }
    }
  };

  fetch(url, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(function (error) {
      console.log(error);
    });;

}

function updateprogress() {
  if (duration <= 0) {
    clearInterval(progress);
    AdComplete();
    return;
  }
  duration -= 1;
  $('#ad-progress').val(duration);
}

function AdComplete(){
  console.log("Ad finisched");
}
