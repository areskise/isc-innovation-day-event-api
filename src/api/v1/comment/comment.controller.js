const commentModel = require('./comment.model');
const { rsSuccess, rsErrorOperation, } = require("../helpers/response");

const getListComment = async (req, res) => {
  try {
    const resData = await commentModel.getListComment(req.query.ideaId, req.query.limit);
    return res.json(rsSuccess(resData))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const addComment = async (req, res) => {
  try {
    const user = req.jwtDecode;
    await commentModel.addComment({
      commentor: user._id,
      idea: req.body.ideaId,
      content: req.body.content,
      create_by: user.email,
    });


    return res.json(rsSuccess(null))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}



module.exports = {
  getListComment,
  addComment,
}
