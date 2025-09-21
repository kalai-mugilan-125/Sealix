import { Document } from '../models/Document';
import { generateHash } from '../utils/hash';
import { blockchainService } from './blockchain.service';

export const documentService = {
  async issueDocument(ownerId: number, title: string, fileUrl: string) {
    const blockchainHash = await generateHash(fileUrl);
    const document = await Document.create({
      title,
      ownerId,
      fileUrl,
      blockchainHash,
      status: 'issued'
    });
    await blockchainService.pushHashToBlockchain(document.id, blockchainHash);
    return document;
  },

  async revokeDocument(documentId: number) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error('Document not found.');
    }
    await document.update({ status: 'revoked' });
    return document;
  },

  async getDocumentDetails(documentId: number) {
    const document = await Document.findByPk(documentId);
    if (!document) {
      throw new Error('Document not found.');
    }
    return document;
  }
};