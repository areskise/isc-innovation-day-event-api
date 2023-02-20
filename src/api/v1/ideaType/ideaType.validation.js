const Joi = require('joi');

const addIdeaTypeSchema = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    title: Joi.string().required(),
  }),
};

module.exports = {
  addIdeaTypeSchema,
}