
const mongoose = require("../helpers/connectDB");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  due_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  status: {
    type: Number,
    require: true,
    default: 1,
  },
  type: {
    type: String,
    require: true,
  },
  create_date: {
    type: Date,
    default: Date.now(),
  },
  create_by: {
    type: String,
    default: null,
  },
  update_date: {
    type: Date,
    default: Date.now(),
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

const EventSchema = mongoose.model("innovation_events", schema);
module.exports  = EventSchema;
