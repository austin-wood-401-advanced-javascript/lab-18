'use strict';

const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

const loadFile = (file) => readFile(file);
const saveFile = (file,buffer) => writeFile(file,buffer);
const convertBuffer = buffer => Buffer.from(buffer.toString().trim().toUpperCase());

/**
 *
 *
 * This function takes in the file and uses event driven programming to uppercase and save the file then returns a success message to the user. 
 * @param {*} file
 * @returns Uppercased file. 
 */
const alterFile = (file) => {
  return loadFile(file)
    .then(buffer => convertBuffer(buffer) )
    .then(buffer => {
      saveFile(file,buffer);
      socket.emit('file-save', buffer.toString());
    })
    .then( success => {
      console.log('saved!');
    })
    .catch(error => socket.emit('file-error', error));
};

module.exports = {alterFile, loadFile, saveFile, convertBuffer};



// 'use strict';

// const fs = require('fs');
// const io = require('socket.io-client');
// const socket = io.connect('http://localhost:3000');

// const alterFile = (file) => {
//   fs.readFile( file, (err, data) => {
//     if(err) { socket.emit('file-error', err);}
//     let text = data.toString().toUpperCase();
//     fs.writeFile( file, Buffer.from(text), (err, data) => {
//       if(err) { socket.emit('file-error', err);}
//       console.log(`${file} saved`);
//       socket.emit('file-saved', text);
//     });
//   });
//   return true;
// };

let file = process.argv.slice(2).shift();
alterFile(file);
