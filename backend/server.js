var cors = require('cors')
var db = require('./db.json')

const express = require("express");

const PORT = 80;

const app = express();

app.use(cors())

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
