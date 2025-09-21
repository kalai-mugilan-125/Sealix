import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';
import { respond } from '../utils/response';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  respond(res, statusCode, message, { details: err.details });
};