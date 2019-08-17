'use strict';

const io = require('socket.io-client');

const socket = io.connect('http//localhost:3000');

socket.on('banana',payload => {
  console.log('bananas were thrown ->', payload);

});