var socket = io();

function addMessage(message){
  var li = jQuery('<li class="list-item"></li>');
  var msg = `${message.from} : ${message.message}`;
  li.append(msg);
  jQuery('#chat-list').append(li);
};


socket.on('connect', function(){

  console.log('New user connected');

  socket.on('newMessage', function(message){
    console.log('Adding message to list');
    addMessage(message);
  });
});

jQuery('#chat-btn').on('click', function(e){
  var qry = jQuery('[name=chatip]').val();
  jQuery('[name=chatip]').val('');
  console.log('Chat query sent ' + qry);
  socket.emit('querySent', qry);
  var msg = {from: 'User', message: qry};
  addMessage(msg);
});