const eventModel = require('./event.model');
const { rsErrorNotFound, rsSuccess, rsErrorOperation, rsError } = require("../helpers/response");

const getEventBySlug = async (req, res) => {
  try {
    const resData = await eventModel.getEventBySlug(req.query.slug);
    if(!resData) {
      return res.json(rsErrorNotFound('Event'));
    }
    return res.json(rsSuccess(resData))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

const addEvent = async (req, res) => {
  try {
    const user = req.jwtDecode;
    await eventModel.addEvent({
      title: req.body.title,
      name: req.body.name,
      slug: req.body.title,
      start_date: new Date(req.body.start_date),
      due_date: new Date(req.body.due_date),
      type: req.body.type,
      create_by: user.email,
    })
    return res.json(rsSuccess(null))
  } catch (error) {
    console.log(error)
    return res.json(rsErrorOperation(error))
  }
}

module.exports = {
  getEventBySlug,
  addEvent,
}
