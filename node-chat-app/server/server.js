const path = require('path');
const http = require('http');
const express  = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the Chat App'
  });

  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user joined'
  });

  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
