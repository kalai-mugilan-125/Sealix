// filepath: /home/monkeydluffy/Documents/Project/Sealix/backend/models/Document.js
const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  filePath: { type: String, required: true },
  hash: { type: String, required: true },
  issuedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  issuedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);