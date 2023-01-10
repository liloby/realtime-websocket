var io = require('socket.io')();

// Listen for new connections from clients (socket)
io.on('connection', function(socket) {
    console.log('Client connected to socket.io');
    // When the current client clicks or listens to add a circle
    socket.on('add-circle', function(data) {
        // The server receive the signal and sends it off to other clients
        io.emit('add-circle', data)
    })
    socket.on('clear', function() {
        io.emit('clear');
    })
});

// io represents socket.io on the server - let's export it
module.exports = io;