const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const badWords = ['bad', 'word', 'naughty'];

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);

    // Проверка на наличие нецензурной лексики
    const filteredMessage = msg.split(' ').filter((word) => !badWords.includes(word.toLowerCase())).join(' ');

    io.emit('chat message', filteredMessage);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
