const socket = require('socket.io');
const { sendMessage } = require('../utils/messages');

module.exports = (server) => {
  var io = socket(server);

  io.on('connect', (socket) => {
    console.log('New User connect to chat!');

    socket.emit('newMessage', sendMessage('Bot', 'Hello, welcome to the weather chat!'));

    socket.on('querySent', (message) => {
      console.log('Query received ');
      console.log(message);
    });

  });
};