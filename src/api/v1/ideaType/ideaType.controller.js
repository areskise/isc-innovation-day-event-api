const ideaTypeModel = require('./ideaType.model');
const { rsErrorNotFound, rsSuccess, rsErrorOperation, rsError } = require("../helpers/response");

const getAllIdeaType = async (req, res) => {
  try {
    const resData = await ideaTypeModel.getAll();
    return res.json(rsSuccess(resData))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const addIdeaType = async (req, res) => {
  try {
    const user = req.jwtDecode;
    await ideaTypeModel.addIdeaType({
      title: req.body.title,
      name: req.body.name,
      create_by: user.email,
  });
    return res.json(rsSuccess(null))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

module.exports = {
    getAllIdeaType,
    addIdeaType,
}
