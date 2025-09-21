import { Request, Response, NextFunction } from 'express';
import { blockchainService } from '../services/blockchain.service';
import { respond } from '../utils/response';
import { logger } from '../config/logger';

export const pushHash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { documentId, hash } = req.body;
    const transactionId = await blockchainService.pushHashToBlockchain(documentId, hash);
    return respond(res, 200, 'Hash pushed to blockchain', { transactionId });
  } catch (error) {
    logger.error('Error pushing hash to blockchain', error);
    next(error);
  }
};

export const verifyHash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { documentId, hash } = req.body;
    const isValid = await blockchainService.verifyIntegrity(documentId, hash);
    return respond(res, 200, 'Blockchain integrity verified', { isValid });
  } catch (error) {
    logger.error('Error verifying hash integrity', error);
    next(error);
  }
};