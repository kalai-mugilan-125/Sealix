import { Router } from 'express';
import { issueDocument, revokeDocument, getDocumentDetails } from '../controllers/document.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

export const documentRoutes = Router();

documentRoutes.post('/issue', authenticateToken, requireRole('issuer'), issueDocument);
documentRoutes.put('/revoke/:id', authenticateToken, requireRole('issuer'), revokeDocument);
documentRoutes.get('/:id', authenticateToken, getDocumentDetails);