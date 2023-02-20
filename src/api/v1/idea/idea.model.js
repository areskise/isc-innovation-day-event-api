const ideaSchema = require('./idea.schema');
const mongoose = require('mongoose');

const getList = async (query, page, itemPerPage) => {
  try {
    query.is_delete = 0;
    const sort = query.sort;

    let ideas;
    if (sort) {
      console.log(JSON.parse(sort))
      ideas = await ideaSchema.paginate(query, {
        sort: JSON.parse(sort),
        page: page,
        limit: itemPerPage,
      });
    } else {
      ideas = await ideaSchema.paginate(query, {
        page: page,
        limit: itemPerPage,
      });
    }

    return ideas;
  } catch (error) {
    throw error;
  }
}

const addIdea = async (body) => {
  try {
    const idea = await ideaSchema.create(body);
    return idea;
  } catch (error) {
    throw error;
  }
}

const updateIdea = async (id, body) => {
  try {
    const idea = await ideaSchema.findByIdAndUpdate(id, body);
    return idea;
  } catch (error) {
    throw error;
  }
}

const setVote = async (id, vote) => {
  try {
    const idea = await ideaSchema.findByIdAndUpdate(id, {$set: {"vote": vote}});
    return idea;
  } catch (error) {
    throw error;
  }
}

const getIdeaById = async (id) => {
  try {
    const idea = await ideaSchema.findOne({
      _id: mongoose.Types.ObjectId(id),
      is_delete: 0,
    })
      .populate('author')
      .populate('type');
    return idea;
  } catch (error) {
    throw error;
  }
}

const getOneIdea = async (query) => {
  try {
    query.is_delete = { $ne: 1 }

    console.log(" query in idea model: ", query );
    return ideaSchema.findOne(query).lean()
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getList,
  addIdea,
  updateIdea,
  getIdeaById,
  getOneIdea,
  setVote
}