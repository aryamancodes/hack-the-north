const justinurl = 'https://htn-backend-jtoft.k8s.csclub.cloud/getRandomWord';

var messages = document.getElementById('messages');
var input = document.getElementById('input');

var timer; 

var timeLeft = 11; // seconds

var currAnswer;

/*
const sendHTTPRequest = (method, url, data) => {
  return fetch(url)
  .then(response => {
    return response.json();
  })
  .then(responseData => {
    console.log(responseData);
  });
};
*/

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
  //$('#playAgainButton').show();
  clearInterval(timer);
  input.style.visibility = "hidden";
  sendButton.style.visibility = "hidden";
  showAnswer();
  getWord();
}



async function getData() {
  const response = await fetch(promptURL);
  const data = await response.json()
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
var first = true;
// The button has an on-click event handler that calls this
function start() {
  if(first){
    getData();
    first = false;
  }
  // setInterval is a built-in function that will call the given function
  // every N milliseconds (1 second = 1000 ms)
  timer = setInterval(updateTimer, 1000);

  // It will be a whole second before the time changes, so we'll call the update
  // once ourselves
  $("#playAgainButton").hide();

  updateTimer();

  var socket = io();
  var messages = document.getElementById("messages");
  var form = document.getElementById("form");
  var input = document.getElementById("input");

  form.addEventListener("submit", function (e) {
    //e.preventDefault();
    if (input.value) {
      socket.emit("send message", input.value);
      input.value = "";
    }
  });

  socket.on("send message", (msg) => {
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

  // We don't want the to be able to restart the timer while it is running,
  // so hide the button.
}
