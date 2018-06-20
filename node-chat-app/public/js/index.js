var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage: ', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(locationMessage){
  console.log(locationMessage);
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')
  a.attr('href', locationMessage.url);
  li.text(`${locationMessage.from}: `);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name="message"]').val()
  }, function(data){
    console.log(data);
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation){
    return alert('Gelocation not support by your browser.');
  }
  navigator.geolocation.getCurrentPosition(function (position){
    var geolocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    socket.emit('createLocationMessage', geolocation, function(data){
      console.log(data);
    });
  }, function(){
    alert('Unable to fetch location.');
  });
});
