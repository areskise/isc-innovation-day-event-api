
const mongoose = require("../helpers/connectDB");

const schema = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "innovation_users",
    require: true,
  },
  idea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "innovation_ideas",
    require: true,
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

const VoteSchema = mongoose.model("innovation_votes", schema);
module.exports  = VoteSchema;
