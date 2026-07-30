"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeSocketIO = initializeSocketIO;
const socket_io_1 = require("socket.io");
const config_1 = require("../config");
function initializeSocketIO(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: config_1.config.cors.origin,
            credentials: true,
        },
    });
    io.on('connection', (socket) => {
        console.log(`⚡ [Socket.IO] Client Connected: ${socket.id}`);
        // Join patient/doctor room
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`📲 Socket ${socket.id} joined room: ${roomId}`);
        });
        // Chat Message Relay
        socket.on('send_message', (data) => {
            io.to(data.roomId).emit('receive_message', data.message);
        });
        // Typing Indicators
        socket.on('typing', (data) => {
            socket.to(data.roomId).emit('user_typing', data);
        });
        // Telemedicine WebRTC Signaling
        socket.on('telemed_signal', (data) => {
            socket.to(data.roomId).emit('telemed_signal_received', data.signal);
        });
        socket.on('disconnect', () => {
            console.log(`🔌 [Socket.IO] Client Disconnected: ${socket.id}`);
        });
    });
    return io;
}
