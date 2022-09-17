// "use strict";
// const Synonymator = require("../");
// const API_KEY = "fdaaf2075b91b0fc3c194f7a80fb6a2f";
 
// let syn = new Synonymator(API_KEY);

// // in each example, data is an array
//   syn.synonyms("time").then((data) => {
//     console.log(data);
//   });
 
// // syn.synonymsNoun("time").then((data) => {
// //   console.log(data);
// // });
 
// // syn.synonymsVerb("time").then((data) => {
// //   console.log(data);
// // });

promptURL = "http://localhost/getRandomWord"

function getPrompt(){
  fetch(promptURL, {mode: 'cors'})
    .then((response) => {
      response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch(function(error) {
      console.log(error);
    });
};

getPrompt();
 