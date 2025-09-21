import { Router } from 'express';
import { requestVerification, updateVerificationStatus } from '../controllers/verification.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

export const verificationRoutes = Router();

verificationRoutes.post('/request', authenticateToken, requireRole('user'), requestVerification);
verificationRoutes.put('/:id/status', authenticateToken, requireRole('verifier'), updateVerificationStatus);