var db = require('./db.json')

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

app.get("/getRandomWord", (req, res) => {
    rInt =  getRandomInt(db['words'].length);
    res.json(db['words'][rInt]);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
