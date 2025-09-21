import { Response } from 'express';

export const respond = (res: Response, status: number, message: string, data?: any) => {
  const response = {
    success: status >= 200 && status < 300,
    message,
    data,
  };
  res.status(status).json(response);
};