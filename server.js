'use strict';

const io = require('socket.io')(3000);

io.on('connection', (socket) => {

  console.log('Welcome', socket.id);

  socket.on('file-error', error => {
    socket.broadcast.emit('file-error', error);
  });
  socket.on('file-saved', fileText => {
    socket.broadcast.emit('file-save',fileText);
  });

  socket.on('speak', (payload) => {
    console.log(payload);
    socket.broadcast.emit('banana',payload);
  });
  
});

