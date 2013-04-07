var port=process.env.PORT || 3001;

var app = require('http').createServer();
var io = require('socket.io').listen(app),
	fs = require('fs');

app.listen(port);
// assuming io is the Socket.IO server object
io.configure(function () {
    io.set("transports", ["xhr-polling"]);
    io.set("polling duration", 10);
});

var users = {};
io.sockets.on('connection', function(socket){
    //socket.emit('who are you');
    socket.on('checkin', function(incoming){
        users[incoming.identifier] = socket.id;
        console.log(users);
    });


	socket.on('my other event', function(data){
		console.log(data);
		//io.sockets.emit('child_added', data);
        //io.sockets.emit('socket', x)
        var socketid = users[data.receiver];
        var mydata = data
        io.sockets.socket(socketid).emit('child_added', mydata);
        socket.emit('child_added', mydata);
	});
	console.log('connected!')
});

console.log('server running at http://127.0.0.1:' + port);
