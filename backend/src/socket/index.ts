import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import { config } from '../config';

export function initializeSocketIO(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: config.cors.origin,
      credentials: true,
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log(`⚡ [Socket.IO] Client Connected: ${socket.id}`);

    // Join patient/doctor room
    socket.on('join_room', (roomId: string) => {
      socket.join(roomId);
      console.log(`📲 Socket ${socket.id} joined room: ${roomId}`);
    });

    // Chat Message Relay
    socket.on('send_message', (data: { roomId: string; message: any }) => {
      io.to(data.roomId).emit('receive_message', data.message);
    });

    // Typing Indicators
    socket.on('typing', (data: { roomId: string; username: string }) => {
      socket.to(data.roomId).emit('user_typing', data);
    });

    // Telemedicine WebRTC Signaling
    socket.on('telemed_signal', (data: { roomId: string; signal: any }) => {
      socket.to(data.roomId).emit('telemed_signal_received', data.signal);
    });

    socket.on('disconnect', () => {
      console.log(`🔌 [Socket.IO] Client Disconnected: ${socket.id}`);
    });
  });

  return io;
}
