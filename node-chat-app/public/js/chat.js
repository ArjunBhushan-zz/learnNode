var socket = io();

function scrollToBottom(){
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if (err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('No error');
    }
  });
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
  scrollToBottom();
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
  scrollToBottom();
});

socket.on('updateUserList', function(users){
  var ul = jQuery('<ul></ul');
  users.forEach((user) => {
    ul.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ul);
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
