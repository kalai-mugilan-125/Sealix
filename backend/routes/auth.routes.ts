import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';
import { verify } from '../controllers/auth.controller';

export const authRoutes = Router();

authRoutes.post('/register', register);
authRoutes.get('/user', verifyToken, verify);
authRoutes.post('/login', login);