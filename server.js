var app = require('http').createServer();
var io = require('socket.io').listen(app),
	fs = require('fs');

app.listen(1337, '127.0.0.1');

io.sockets.on('connection', function(socket){
	socket.on('my other event', function(data){
		console.log(data);
		io.sockets.emit('child_added', {message: data.val()})
	});
	console.log('connected!')
});

console.log('server running at http://127.0.0.1:1337');
