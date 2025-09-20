const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  role: { type: String, enum: ['user','issuer','verifier','admin'], default: 'user' },
  passwordHash: String,
  externalId: String
},{ timestamps: true })
module.exports = mongoose.model('User', UserSchema)
