const mongoose = require('../helpers/connectDB');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isActive: {
    type: Number,
    required: true,
    default: 1  //1:active 0:unactive
  },
  expiredTime: {
    type: Date,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  create_by: {
    type: String,
    default: null,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
  update_by: {
    type: String,
    default: null,
  },
  is_delete: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model('innovation_otps', OtpSchema);
