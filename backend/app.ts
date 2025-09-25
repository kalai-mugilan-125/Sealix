import "reflect-metadata";
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { env } from './config/env';
import { logger } from './config/logger';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { documentRoutes } from './routes/document.routes';
import { verificationRoutes } from './routes/verification.routes';
import { blockchainRoutes } from './routes/blockchain.routes';
import { errorHandler } from './middleware/error.middleware';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/verify', verificationRoutes);
app.use('/api/blockchain', blockchainRoutes);

app.use(errorHandler);

export default app;