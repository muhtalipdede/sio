const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('typing', (msg) => {
        console.log('typing: ' + msg);
        socket.broadcast.emit('typing', msg);
    });

    socket.on('stop typing', (msg) => {
        console.log('stop typing: ' + msg);
        socket.broadcast.emit('stop typing', msg);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});