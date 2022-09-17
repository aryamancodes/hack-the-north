var timer; 
var timeLeft = 11; // seconds

// What to do when the timer runs out
// IMPORTANT: run playbutton request before cancelInterval(timer)
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  $('#playAgainButton').show();


  cancelInterval(timer);
  
  // 
  // re-show the button, so they can start it again

}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if(timeLeft >= 0)
    $('#timer').html(timeLeft);
  else {
    gameOver();
  }
}

// The button has an on-click event handler that calls this
function start() {
  // setInterval is a built-in function that will call the given function
  // every N milliseconds (1 second = 1000 ms)
  timer = setInterval(updateTimer, 1000);
  
  // It will be a whole second before the time changes, so we'll call the update
  // once ourselves
  $('#playAgainButton').hide();

  updateTimer();
  
  // We don't want the to be able to restart the timer while it is running,
  // so hide the button.
}