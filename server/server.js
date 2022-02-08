const express = require('express');
const path = require('path');

const socket = require('socket.io');
const app = express();
let messages = [];
let users = [];

app.use(express.static(__dirname + '../../client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    const userMessage = message;
    userMessage.contentType = 'clientMessage';

    console.log("Oh, I've got something from " + socket.id);
    messages.push(userMessage);
    socket.broadcast.emit('message', userMessage);
  });
  socket.on('login', (data) => {
    users.push({ name: data.user, id: socket.id });
  });
  socket.on('disconnect', () => {
    let userId = socket.id;

    const indexOfUser = users.findIndex((el) => {
      return el.id === userId;
    });

    if (indexOfUser >= 0) {
      const userName = users[indexOfUser].name;
      socket.broadcast.emit('leftChat', {
        author: 'ChatBot',
        content: `User ${userName} left chat...`,
        contentType: 'botMessage',
      });
      users.splice(indexOfUser, 1);
    }
  });
});
