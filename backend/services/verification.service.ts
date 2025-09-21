import { Verification } from '../models/Verification';
import { Document } from '../models/Document';
import { User } from '../models/User';
import { emailService } from './email.service';

export const verificationService = {
  async requestVerification(documentId: number, verifierId: number) {
    const document = await Document.findByPk(documentId, { include: [User] });
    if (!document) {
      throw new Error('Document not found.');
    }
    const verification = await Verification.create({
      documentId,
      verifierId,
      status: 'pending'
    });
    const verifier = await User.findByPk(verifierId);
    if(verifier) {
      await emailService.sendVerificationRequestEmail(verifier.email, document.title);
    }
    return verification;
  },

  async updateVerificationStatus(verificationId: number, status: string, remarks: string) {
    const verification = await Verification.findByPk(verificationId, { include: [{ model: Document, include: [User] }, { model: User, as: 'verifier' }] });
    if (!verification) {
      throw new Error('Verification request not found.');
    }
    await verification.update({ status, remarks });
    if (verification.document && verification.document.owner) {
      await emailService.sendVerificationResultEmail(verification.document.owner.email, verification.document.title, status);
    }
    return verification;
  }
};