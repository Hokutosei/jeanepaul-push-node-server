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
var acknowledging_users = [];
io.sockets.on('connection', function(socket){
    //socket.emit('who are you');
    socket.on('checkin', function(incoming){
        users[incoming.identifier] = socket.id;
        socket.emit('logged_in_users', users);
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

    // check user if loggedin
    var delay = 8000;
    var timer = setTimeout(checkUser, delay);
    function checkUser() {
        socket.emit('check user');
        timer = setTimeout(checkUser, delay);
    }
    socket.on('user online', function(data){
        var msg = 'acknowledge'

        var socketid = users[data.user];

        io.sockets.socket(socketid).emit('acknowledge user', msg)
    })
});

console.log('server running at http://127.0.0.1:' + port);
