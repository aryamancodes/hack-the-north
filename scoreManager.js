const wordsArray = ["Banana", "Orange", "Apple", "Mango"];
const wordGuessed = "Apple"; //set to the user's input

var length = wordsArray.length;
// score = (length - index) *100

var index = wordsArray.indexOf(wordGuessed);

var score = (length - index) * 100;

console.log(score);



