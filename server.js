// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

// const, how many rooms ill provide
var NUMROOMS = 10;

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

users = [];
for (var i = 0; i < NUMROOMS; i++){
	users[i] = [];
}
var clients = 0;
// On connection 
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
	
	// once room num is specified
	socket.on('room', function(room) {
		socket.join(room);
		io.sockets.in(room).emit('connectToRoom', "You are in room "+room);
		socket.on('setUsername', function(data) {
			// Skipping check for repeat names for now, can implement later
			//if (users[room].indexOf(data) > -1) {
			
			users[room].push(data);
			io.sockets.in(room).emit('users_here', users[room]);
			
			// if disconnect
			socket.on('disconnect', function () {
				//clients--;
				var index = users[room].indexOf(data);
				if (index !== -1){
					users[room].splice(index, 1);
					io.sockets.in(room).emit('users_here', users[room]);
				}
			//io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
			});
		});

	});
});

//test msg
setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);
