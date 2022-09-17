const promptURL = 'https://htn-backend-jtoft.k8s.csclub.cloud/getRandomWord';

var messages = document.getElementById('messages');
var input = document.getElementById('input');
var timer; 
var timeLeft = 61; // seconds+1
var currAnswer;
var firstApiCall = true;
var currPrompt = [];

function getInput(){
  if (input.value) {
    currAnswer = input.value;
    input.value = '';
  }
}

// What to do when the timer runs out
// IMPORTANT: run playbutton request before cancelInterval(timer)
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  clearInterval(timer);
  input.style.visibility = "hidden";
  sendButton.style.visibility = "hidden";
  showAnswer();
  getWord();
}



async function getData() {
  const response = await fetch(promptURL);
  const data = await response.json()
  currPrompt = data;
  console.log(currPrompt);
}

function showAnswer(){
  var item = document.createElement('li');
  item.textContent = currAnswer;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
}

function updateTimer() {
  timeLeft = timeLeft - 1;
  if (timeLeft >= 0) $("#timer").html(timeLeft);
  else {
    gameOver();
  }
}
// The button has an on-click event handler that calls this
function start() {
  if(firstApiCall){
    getData();
    firstApiCall = false;
  }
  // setInterval is a built-in function that will call the given function
  // every N milliseconds (1 second = 1000 ms)
  timer = setInterval(updateTimer, 1000);

  // It will be a whole second before the time changes, so we'll call the update
  // once ourselves
  $("#playAgainButton").hide();

  updateTimer();
   // We don't want the to be able to restart the timer while it is running,
  // so hide the button.
}
