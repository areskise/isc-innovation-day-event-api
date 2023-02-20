const voteModel = require('./vote.model');
const ideaModel = require('../idea/idea.model');
const { rsErrorNotFound, rsSuccess, rsErrorOperation, rsError } = require("../helpers/response");

const addVote = async (req, res) => {
  try {
    const user = req.jwtDecode;
    const idea = await ideaModel.getIdeaById(req.body.ideaId)
    if(!idea) {
      return res.json(rsErrorNotFound("idea"));
    }
    const find = await voteModel.findVote(user._id, req.body.ideaId);
    if(find) {
      return res.json(rsError(415, 'User voted this idea before'));
    }
    await voteModel.addVote({
      voter: user._id,
      idea: req.body.ideaId,
      create_by: user.email,
    });
    const count = await voteModel.countVote(req.body.ideaId)
    await ideaModel.setVote({_id:req.body.ideaId},count)
    return res.json(rsSuccess(null))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const getCountVote = async (req, res) => {
  try {
    const ideaId = req.query.ideaId
    var rs = {
      count : 0,
      is_vote: 1
    }
    const count = await voteModel.countVote(ideaId);
    rs.count = count;
    const user = req.jwtDecode;
    if(user){
      const find = await voteModel.findVote(user._id, ideaId);
      if(find && find.is_delete == 0) {
        rs.is_vote = 1
      }else{
        rs.is_vote = 0
      }
    }
    return res.json(rsSuccess(rs))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const getListVote = async (req, res) => {
  try {
    const ideaId = req.query.ideaId
    const rs = await voteModel.getListVote( ideaId )
    return res.json(rsSuccess(rs))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const deleteVote = async (req, res) => {
  try {
    const user = req.jwtDecode;
    await voteModel.deleteVote(user._id, req.query.ideaId);
    return res.json(rsSuccess(null))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

module.exports = {
  addVote,
  deleteVote,
  getCountVote,
  getListVote
}
