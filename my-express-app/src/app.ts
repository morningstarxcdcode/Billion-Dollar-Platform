// Removed duplicate import of express
import express from 'express';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { setRoutes } from './routes';
import { logger } from './middleware';
import { errorHandler } from './middleware/error.middleware';
import { monitoringMiddleware } from './middleware/monitoring.middleware';
import { register } from './services/monitoring';

const app = express();
export { app };

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.env === 'production' ? config.corsOrigin : true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json({ limit: '10kb' }));

// Monitoring middleware
app.use(monitoringMiddleware);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: config.env === 'production' ? 100 : 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Logger middleware
// Remove this line because logger is not an Express middleware
// app.use(logger);

// Instead, use the loggerMiddleware as middleware
import { loggerMiddleware } from './middleware/logger.middleware';
app.use(loggerMiddleware);

// Root route for welcome message
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Express App');
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

// Routes
setRoutes(app);

// Handle 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling
app.use(errorHandler);

const server = app.listen(config.port, () => {
  console.log(`Server is running in ${config.env} mode on http://localhost:${config.port}`);
  console.log(`API Documentation available at http://localhost:${config.port}/api-docs`);
  console.log(`Metrics available at http://localhost:${config.port}/metrics`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false).then(() => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});
