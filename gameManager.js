const promptURL = 'https://htn-backend-jtoft.k8s.csclub.cloud/getRandomWord';

var messages = document.getElementById('messages');
var input = document.getElementById('input');
var promptOutput = document.getElementById('definition');
var score = document.getElementById('score');
var gameMessage = document.getElementById('output');
var playButton = document.getElementById('playAgainButton');

var timer; 
var timeLeft = 3; // seconds+1
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
    var length = currPrompt.synonyms.length;
    var index = currPrompt.synonyms.indexOf(currGuess);
    var fraction = 1 - (index/length).toFixed(2);
    var currScore = fraction * 100;

    score.textContent = (parseInt(score.textContent) + currScore).toString();
    gameMessage.textContent = "Correct Guess! Next Word:";
    getPrompt();
  }
  else {
    gameMessage.textContent = "Incorrect Guess! Keep Trying!";
    // place a text prompt!
  }
}

// What to do when the timer runs out
// IMPORTANT: run playbutton request before cancelInterval(timer)
function gameOver() {
  // This cancels the setInterval, so the updateTimer stops getting called
  playAgainButton.textContent = "Play again";
  playAgainButton.style.visibility = "visible";
  clearInterval(timer);
  input.style.visibility = "hidden";
  sendButton.style.visibility = "hidden";
  showAnswer();
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

//show syns for last unguessed word
function showAnswer(){
  output = "Time's up! The synonyms for " + currPrompt.word + " are:\n";
  for(syn of currPrompt.synonyms){
    output += syn + ", ";
  }
  promptOutput.value = output.slice(0,-2);
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
  if(playAgainButton.textContent == "Play again"){
    location.reload();
  }
  else { timer = setInterval(updateTimer, 1000); }

  // It will be a whole second before the time changes, so we'll call the update
  // once ourselves
  playAgainButton.style.visibility = "hidden";
  //$("#playAgainButton").hide();

  updateTimer(); 
}
