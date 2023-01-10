const io = require('socket.io')();

// object to hold player's initials as keys
const players = {};

// Listen for new connections from clients (socket)
io.on('connection', function(socket) {
    console.log('Client connected to socket.io');
    // Register players on the client
    socket.on('register-player', function(initials) {
        // each socket has a unique id
        players[socket.id] = initials;
        io.emit('update-player-list', Object.values(players));
    })
    socket.on('disconnect', function() {
        delete players[socket.id];
        io.emit('update-player-list', Object.values(players))
    })
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