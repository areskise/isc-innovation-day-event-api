
const mongoose = require("../helpers/connectDB");

const schema = new mongoose.Schema({
  commentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "innovation_users",
    require: true,
  },
  idea: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "innovation_ideas",
    require: true,
  },
  content: {
    type: String,
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

schema.virtual('_commentor', {
  ref: 'innovation_users',
  localField: 'commentor',
  foreignField: '_id',
  justOne: true
})

const CommentSchema = mongoose.model("innovation_comments", schema);
module.exports  = CommentSchema;
