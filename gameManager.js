const promptURL = 'https://htn-backend-jtoft.k8s.csclub.cloud/getRandomWord';

var messages = document.getElementById('messages');
var input = document.getElementById('input');
var promptOutput = document.getElementById('definition');
var score = document.getElementById('score');

var timer; 
var timeLeft = 31; // seconds+1
var currGuess;
var firstApiCall = true;

//struct of the form:
//  { word:, definition:, synonyms: };
var currPrompt


//called when an input is made by the player
function getInput(){
  if (input.value) {
    currGuess = input.value;
    input.value = '';
    evaluateAnswer();
  }
}

//format str to remove all whitespace and covert to lowerecase
function formatString(str) {
  output = str.toLowerCase().replaceAll(' ', '');
  return output;
}

function evaluateAnswer(){
  if(currPrompt.synonyms.includes(currGuess)){
    score.textContent = (parseInt(score.textContent)+1).toString();;
    getPrompt();
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



async function getPrompt() {
  const response = await fetch(promptURL);
  const data = await response.json()
  //reject words with syns less than the minimum of 3
  if(data.syns.length <= 3){
    getPrompt();
  }
  else{
      currPrompt = {
      word: formatString(data.word),
      definition: data.definition, 
      synonyms: data.syns
    };
    console.table(currPrompt)
    promptOutput.value = currPrompt.word + ":\n" + currPrompt.definition;
  }
}

function showAnswer(){
  //TODO: show syns for last unguessed word
  
  // var item = document.createElement('li');
  // item.textContent = currGuess;
  // messages.appendChild("The possible synonyms were" + item);
  // window.scrollTo(0, document.body.scrollHeight);
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
    getPrompt();
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
