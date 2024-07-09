// backend/socket.js

function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });

    // Emit events on task updates
    socket.on('taskCreated', () => {
      io.emit('taskCreated');
    });

    socket.on('taskUpdated', () => {
      io.emit('taskUpdated');
    });

    socket.on('taskDeleted', () => {
      io.emit('taskDeleted');
    });
  });

  global.io = io;  // Set up global.io for use in other parts of the backend
}

function socketMiddleware(req, res, next) {
  req.io = global.io;
  next();
}

module.exports = { setupSocket, socketMiddleware };
