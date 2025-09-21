import axios from 'axios';
import { env } from '../config/env';

export const blockchainService = {
  async pushHashToBlockchain(documentId: number, hash: string) {
    const response = await axios.post(`${env.BLOCKCHAIN_URL}/push`, { documentId, hash });
    return response.data.transactionId;
  },

  async verifyIntegrity(documentId: number, hash: string) {
    const response = await axios.post(`${env.BLOCKCHAIN_URL}/verify`, { documentId, hash });
    return response.data.isValid;
  }
};