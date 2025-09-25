import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { respond } from '../utils/response';
import { logger } from '../config/logger';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await authService.registerUser(name, email, password, role);
    return respond(res, 201, 'User registered successfully', { user });
  } catch (error) {
    logger.error('Error during registration', error);
    let errorMessage = 'Registration failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return res.status(500).json({ message: errorMessage });
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    return respond(res, 200, 'Login successful', { token, user });
  } catch (error) {
    logger.error('Error during login', error);
    next(error);
  }
};

export const verify = (req: Request, res: Response) => {
  // The user data is available on the request object from the middleware
  return respond(res, 200, 'Token is valid', { user: req.user });
};