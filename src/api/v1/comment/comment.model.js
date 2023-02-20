const commentSchema = require('./comment.schema');
const mongoose = require('mongoose');

const getListComment = async (ideaId, limit) => {
  try {
    const comments = await commentSchema.find({
      idea: mongoose.Types.ObjectId(ideaId),
      is_delete: 0
    }).populate('commentor').sort({ _id: -1 }).limit(limit?limit:5);
    return comments;
  } catch (error) {
    throw error;
  }
}

const addComment = async (body) => {
  try {
    const comment = await commentSchema.create(body);
    return comment;
  } catch (error) {
    throw error;
  }
}


module.exports = {
  getListComment,
  addComment,
}
