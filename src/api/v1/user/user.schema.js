
const mongoose = require("../helpers/connectDB");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  employee_id: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
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
  },
  is_admin: {
    type: Boolean,
    default: false,
  }
});

const UserSchema = mongoose.model("innovation_users", schema);
module.exports = UserSchema;
