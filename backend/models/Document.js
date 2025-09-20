const mongoose = require('mongoose')
const DocumentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  storagePath: String,
  hash: String,
  issuerId: String,
  docType: String,
  issuedAt: Date,
  blockchainTxId: String
},{ timestamps: true })
module.exports = mongoose.model('Document', DocumentSchema)
