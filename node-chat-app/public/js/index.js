var socket = io();
socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  console.log(message);
  var template = jQuery('#message-template').html();
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function(locationMessage){
  console.log(locationMessage);
  var formattedTime = moment(locationMessage.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: locationMessage.from,
    url: locationMessage.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
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
