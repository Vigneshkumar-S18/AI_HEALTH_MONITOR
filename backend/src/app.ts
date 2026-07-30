import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: config.cors.origin, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300, // 300 requests per 15 mins per IP
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use(limiter);

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'HEALTHY', timestamp: new Date(), service: 'MedFlow AI Backend API' });
});

// API Routes
app.use(config.apiPrefix, routes);

// Global Error Handler
app.use(errorHandler);

export default app;
