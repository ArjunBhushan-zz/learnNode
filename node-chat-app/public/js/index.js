var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage: ', message);
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(locationMessage){
  console.log(locationMessage);
  var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>')
  a.attr('href', locationMessage.url);
  li.text(`${locationMessage.from} ${formattedTime}: `);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function(){
    messageTextbox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if(!navigator.geolocation){
    return alert('Gelocation not support by your browser.');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location');
  navigator.geolocation.getCurrentPosition(function (position){
    var geolocation = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    socket.emit('createLocationMessage', geolocation, function(){
      locationButton.removeAttr('disabled').text('Send location');
    });
  }, function(){
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
