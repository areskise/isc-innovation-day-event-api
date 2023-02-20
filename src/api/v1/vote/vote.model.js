const voteSchema = require('./vote.schema');
const mongoose = require('mongoose');

const countVote = async (ideaId) => {
  try {
    const count = await voteSchema.count({
      idea: mongoose.Types.ObjectId(ideaId),
      is_delete: 0,
    });
    return count;
  } catch (error) {
    throw error;
  }
}

const findVote = async (voter, idea) => {
  try {
    const find = await voteSchema.findOne({
      voter: mongoose.Types.ObjectId(voter),
      idea: mongoose.Types.ObjectId(idea),
      is_delete: 0,
    });
    return find;
  } catch (error) {
    throw error;
  }
}

const addVote = async (body) => {

  const session = await voteSchema.startSession()
  session.startTransaction()
  
  try {
    const vote = await voteSchema.create(body);

    await session.commitTransaction();
    session.endSession();

    return vote;
  } catch (error) {

    await session.abortTransaction();
    session.endSession();

    throw error;
  }
}

const deleteVote = async (voter, idea) => {
  try {
    const ideaType = await voteSchema.findOneAndUpdate({
        voter: mongoose.Types.ObjectId(voter),
        idea: mongoose.Types.ObjectId(idea),
        is_delete: 0,
      },
      {
        is_delete: 1,
      }
    );
    return ideaType;
  } catch (error) {
    throw error;
  }
}

const getListVote = async ( idea) => {
  try {
    const find = await voteSchema.find(
      {
        idea: mongoose.Types.ObjectId(idea),
        is_delete: 0,
      },
      {create_date:1, create_by: 1, voter:1, _id:0})
      .populate({path:'voter', select:'name'});
    return find;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  countVote,
  findVote,
  addVote,
  deleteVote,
  getListVote
}