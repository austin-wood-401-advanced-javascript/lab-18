'use strict';

const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');


setInterval( () => {
  socket.emit('file-saved', 'OMG THE save!!');
},1000);

