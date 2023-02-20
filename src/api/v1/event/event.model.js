const eventSchema = require('./event.schema');

const getEventBySlug = async (slug) => {
  try {
    const event = await eventSchema.findOne({slug: slug});
    return event;
  } catch (error) {
    throw error;
  }
}

const addEvent = async (body) => {
  try {
    const event = await eventSchema.create(body);
    return event;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getEventBySlug,
  addEvent,
}