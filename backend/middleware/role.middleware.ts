import { Request, Response, NextFunction } from 'express';
import { respond } from '../utils/response';

export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      return respond(res, 403, 'Access denied. You do not have the required role.');
    }
  };
};