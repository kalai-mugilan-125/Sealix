import { Router } from 'express';
import { pushHash, verifyHash } from '../controllers/blockchain.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';

export const blockchainRoutes = Router();

blockchainRoutes.post('/push', authenticateToken, requireRole('issuer'), pushHash);
blockchainRoutes.post('/verify', authenticateToken, requireRole('verifier'), verifyHash);