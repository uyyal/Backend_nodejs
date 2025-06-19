const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  firm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Firm'
  },
  registrationTime: {
    type: Date,
    default: Date.now
  },
  lastLoginTime: {
    type: Date
  },
  lastLogoutTime: {
    type: Date
  }
});

const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = Vendor;