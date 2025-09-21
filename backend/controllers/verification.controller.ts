import { Request, Response, NextFunction } from 'express';
import { verificationService } from '../services/verification.service';
import { respond } from '../utils/response';
import { logger } from '../config/logger';

export const requestVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { documentId } = req.body;
    const verifierId = req.user.id;
    const verification = await verificationService.requestVerification(documentId, verifierId);
    return respond(res, 201, 'Verification request sent successfully', { verification });
  } catch (error) {
    logger.error('Error requesting verification', error);
    next(error);
  }
};

export const updateVerificationStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    const verification = await verificationService.updateVerificationStatus(parseInt(id), status, remarks);
    return respond(res, 200, 'Verification status updated successfully', { verification });
  } catch (error) {
    logger.error('Error updating verification status', error);
    next(error);
  }
};