import bcrypt from 'bcrypt';
import crypto from 'crypto';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateHash = (data: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha256').update(data).digest('hex');
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};