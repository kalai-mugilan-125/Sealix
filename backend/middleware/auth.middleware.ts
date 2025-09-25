import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { respond } from '../utils/response';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return respond(res, 401, 'Access denied. No token provided.');

  try {
    const user = jwt.verify(token, env.JWT_SECRET) as { id: number, role: string };
    req.user = user;
    next();
  } catch (error) {
    return respond(res, 403, 'Invalid token.');
  }
};

// Renamed from 'authenticateToken' to 'verifyToken' to match the import in auth.routes.ts
export const verifyToken = authenticateToken;