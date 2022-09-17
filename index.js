const express = require('express');
const app = express();
const http = require('http');
const { SocketAddress } = require('net');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

var clients = [];

server.listen(3000, () => {
    console.log("Listening on *:3000");
});

io.on('connection', (socket) => {
    clients.push(socket.clientid);
    console.log("User connected");

    socket.on('send message', (msg) => {
        console.log('message: ' + msg);
        io.emit('send message', msg);
    });
});