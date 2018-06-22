const path = require('path');
const http = require('http');
const express  = require('express');
const socketIO = require('socket.io');

const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');
const {generateMessage} = require('./utils/message');
const {generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');
var port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('updateRooms', rooms.rooms);
  socket.on('createMessage', (newMessage, callback) => {
    console.log('createMessage', newMessage);
    var user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }
    callback();
  });

  socket.on('createLocationMessage', (coords, callback) => {
    console.log('createLocationMessage', coords);
    var user = users.getUser(socket.id);
    if (user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
    callback();
  });

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.');
    }
    params.room = params.room.toLowerCase();

    //check if user exists with that name (if they do, return callback with message)
    if(users.getUsersByName(params.name).find((user) => user.room === params.room)){
      return callback('Please choose a unique name for that room');
    }

    socket.join(params.room);
    rooms.addUser(params.name, params.room);
    io.emit('updateRooms', rooms.rooms);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    //socket.leave('The Office Fans');
    //io.emit -> io.to('The Office Fans').emit
    //socket.broadcast.emit -> stocket.broadcast.to('The Office Fans').emit
    //socket.emit
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    var user = users.removeUser(socket.id);
    if (user){
      rooms.removeUser(user.name, user.room);
      io.emit('updateRooms', rooms.rooms);
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});
