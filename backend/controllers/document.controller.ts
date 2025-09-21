import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/document.service';
import { respond } from '../utils/response';
import { logger } from '../config/logger';

export const issueDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, fileUrl } = req.body;
    const ownerId = req.user.id;
    const document = await documentService.issueDocument(ownerId, title, fileUrl);
    return respond(res, 201, 'Document issued successfully', { document });
  } catch (error) {
    logger.error('Error issuing document', error);
    next(error);
  }
};

export const revokeDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await documentService.revokeDocument(parseInt(id));
    return respond(res, 200, 'Document revoked successfully');
  } catch (error) {
    logger.error('Error revoking document', error);
    next(error);
  }
};

export const getDocumentDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const document = await documentService.getDocumentDetails(parseInt(id));
    return respond(res, 200, 'Document details fetched successfully', { document });
  } catch (error) {
    logger.error('Error fetching document details', error);
    next(error);
  }
};