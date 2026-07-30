import http from 'http';
import app from './app';
import { config } from './config';
import { initializeSocketIO } from './socket';

const server = http.createServer(app);
const io = initializeSocketIO(server);

server.listen(config.port, () => {
  console.log(`
=====================================================
  🏥 MedFlow AI - Phase 2 Patient Engagement Server
=====================================================
  Status:      Running in ${config.env.toUpperCase()} mode
  Port:        http://localhost:${config.port}
  WebSockets:  Socket.IO active
  API Prefix:  http://localhost:${config.port}${config.apiPrefix}
  Healthcheck: http://localhost:${config.port}/health
=====================================================
  `);
});

process.on('unhandledRejection', (err: Error) => {
  console.error('Unhandled Promise Rejection:', err);
  server.close(() => process.exit(1));
});
