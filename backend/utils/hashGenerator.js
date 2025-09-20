const crypto = require('crypto');
const fs = require('fs').promises;

const generateHash = async (filePath) => {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  } catch (error) {
    throw new Error('Error generating document hash');
  }
};

module.exports = { generateHash };
