var time = 30;

function startTimer(){
  time  = 30;
  $('#timer').html(time);
  $('#progressBar').attr("max",time);
  setInterval(updateTimer, 1000);
}

function updateTimer(){
  if(time <= 0) {
    clearInterval();
    stopTimer();
    return;
  }
  time -= 1;
  $('#timer').html(time);
  $('#progressBar').val(time);
}

function stopTimer(){
  console.log("Timer finisched");
}

startTimer();
