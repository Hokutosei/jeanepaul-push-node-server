var port=process.env.PORT || 3000;

var app = require('http').createServer();
var io = require('socket.io').listen(app),
	fs = require('fs');

app.listen(port);
// assuming io is the Socket.IO server object
io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

io.sockets.on('connection', function(socket){
	socket.on('my other event', function(data){
		console.log(data);
		io.sockets.emit('child_added', data)
	});
	console.log('connected!')
});

console.log('server running at http://127.0.0.1:' + port);
