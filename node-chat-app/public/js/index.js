var socket = io();


socket.on('updateRooms', function(rooms){
  console.log(rooms);
  var div = jQuery('#rooms');
  var ulRoom = jQuery('<ul></ul>');
  rooms.forEach((chat) => {
    var li = jQuery('<li></li>');
    li.attr("name", chat.room);
    li.text(chat.room+ " - " + chat.users.join(' '));
    ulRoom.append(li);
  });
  div.html(ulRoom);
});

socket.on('disconnect', function(){
  console.log('User disconnected');
});
