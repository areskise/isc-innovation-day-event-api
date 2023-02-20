
const mongoose = require("../helpers/connectDB");
const mongoosePaginate = require("mongoose-paginate");

const schema = new mongoose.Schema({
  avatar: {
    //link file upload
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    require: true,
  },
  file: {
    //link file upload
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "innovation_users",
    require: true,
  },
  department: {
    type: String,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "innovation_events",
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
  vote: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
  is_delete: {
    type: Number,
    default: 0,
  }
});

schema.plugin(mongoosePaginate);

schema.virtual('_author', {
  ref: 'innovation_users',
  localField: 'author',
  foreignField: '_id',
  justOne: true
})

schema.virtual('_type', {
  ref: 'innovation_idea_types',
  localField: 'type',
  foreignField: 'title',
  justOne: true
})

const IdeaSchema = mongoose.model("innovation_ideas", schema);
module.exports = IdeaSchema;
