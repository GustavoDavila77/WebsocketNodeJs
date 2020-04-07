const express = require('express');
const path = require('path'); //concatenar directorios
const socketIO = require('socket.io');
const http = require('http');

//initialation
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//setting
//app.set('port', process.env.PORT || 8080); //si hay un # de puerto config en el pc utilicelo, sino utlice el 3000

//middlewares 

// sockets
require('./sockets')(io);

// static file
app.use(express.static(path.join(__dirname, 'public')));
//console.log(__dirname); // get current path

// starting server on port
server.listen(3000);
console.log('server en 3000');

/*
app.listen(app.get('port'), ()=> {
    console.log('server en 8080'); 
})*/