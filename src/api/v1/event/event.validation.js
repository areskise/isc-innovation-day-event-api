const Joi = require('joi');

const getEventBySlugSchema = {
  query: Joi.object().keys({
    slug: Joi.string().required(),
  }),
};

const addEventSchema = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    name: Joi.string().required(),
    start_date: Joi.string().required(),
    due_date: Joi.string().required(),
    type: Joi.string().required(),
  }),
};

module.exports = {
  getEventBySlugSchema,
  addEventSchema,
}