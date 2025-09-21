import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';

export const userRoutes = Router();

userRoutes.get('/profile', authenticateToken, getProfile);
userRoutes.put('/profile', authenticateToken, updateProfile);