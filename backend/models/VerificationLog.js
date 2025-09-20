const mongoose = require('mongoose');

const VerificationLogSchema = new mongoose.Schema({
  document: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  verifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  verifiedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['success', 'failure'], required: true },
  notes: { type: String }
});

module.exports = mongoose.model('VerificationLog', VerificationLogSchema);