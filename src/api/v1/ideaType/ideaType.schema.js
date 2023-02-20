
const mongoose = require("../helpers/connectDB");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
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
  }
});

const IdeaTypeSchema = mongoose.model("innovation_idea_types", schema);
module.exports  = IdeaTypeSchema;
