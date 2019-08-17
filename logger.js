'use strict';
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000');

socket.on('file-error', error => {
  console.log('There was an error and it looked like this!',error);
});

socket.on('file-saved', fileText => {
  console.log('this text file was just saved!',fileText);
});

module.exports = {socket};