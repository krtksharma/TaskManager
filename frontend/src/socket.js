// frontend/src/socket.js
import io from 'socket.io-client';

const socket = io('http://localhost:5000');  // Ensure this URL is correct for your backend

export default socket;
