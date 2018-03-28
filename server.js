// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);



app.set('port', 5000);

//specifying folders with files we interact with
app.use('/static', express.static(__dirname + '/static'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/', express.static(__dirname));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});


// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

var clients = 0;
// Add the WebSocket handlers
io.on('connection', function(socket) {
	
	// keep count of clients
	clients++;
	
	// collect & send available room data for menu to be filled
	var availableRooms = [];
    var rooms = io.sockets.adapter.rooms;
    if (rooms) {
        for (var room in rooms) {
            if (!rooms[room].hasOwnProperty(room)) {
                availableRooms.push(room);
            }
        }
    }
	io.sockets.emit('avail_rooms',{ description: availableRooms});
	socket.on('room', function(room) {
		socket.join(room);
	});
	io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
	socket.on('disconnect', function () {
		clients--;
		io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
	});
	
});

//test msg
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
