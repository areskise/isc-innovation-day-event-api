const ideaTypeSchema = require('./ideaType.schema');

const getAll = async () => {
  try {
    const ideaTypes = await ideaTypeSchema.find({
      is_delete: 0
    });
    return ideaTypes;
  } catch (error) {
    throw error;
  }
}

const addIdeaType = async (body) => {
  try {
    const ideaType = await ideaTypeSchema.create(body);
    return ideaType;
  } catch (error) {
    throw error;
  }
}

const getTypeByTitle = async (title) => {
  try {
    const ideaType = await ideaTypeSchema.findOne({
      title: title
    });
    return ideaType;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAll,
  addIdeaType,
  getTypeByTitle,
}