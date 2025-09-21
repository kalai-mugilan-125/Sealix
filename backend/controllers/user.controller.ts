import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { respond } from '../utils/response';
import { logger } from '../config/logger';

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserProfile(userId);
    return respond(res, 200, 'User profile fetched successfully', { user });
  } catch (error) {
    logger.error('Error fetching user profile', error);
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const user = await userService.updateUserProfile(userId, data);
    return respond(res, 200, 'User profile updated successfully', { user });
  } catch (error) {
    logger.error('Error updating user profile', error);
    next(error);
  }
};