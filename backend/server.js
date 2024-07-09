
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const { setupSocket, socketMiddleware } = require('./socket');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST'],
  },
});

setupSocket(io);

mongoose.connect("mongodb+srv://krtksharma7:uQAifhEJPWk5QxbY@taskmanager.it3w02o.mongodb.net/taskManager?retryWrites=true&w=majority&appName=taskManager", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

// Use the socket middleware
app.use(socketMiddleware);

app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${5000}`));
