const Joi = require('joi');

const addIdeaSchema = {
  body: Joi.object().keys({
    avatar: Joi.string().required(),
    name: Joi.string().required(),
    short_desc: Joi.string().required(),
    type: Joi.string().required(),
    file: Joi.string().required(),
    event: Joi.string().hex().length(24).required(),
  }),
};

const updateIdeaSchema = {
  body: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
    avatar: Joi.string().required(),
    name: Joi.string().required(),
    short_desc: Joi.string().required(),
    type: Joi.string().required(),
    file: Joi.string().required(),
  }),
};

const getListIdeaSchema = {
  query: Joi.object().keys({
    event: Joi.string().hex().length(24).required(),
    page: Joi.number().required(),
    item_per_page: Joi.number().required(),
    type: Joi.string(),
    department: Joi.string(),
    sort: Joi.string(),
    vote: Joi.number(),
    status: Joi.number()
  }),
};

module.exports = {
  addIdeaSchema,
  getListIdeaSchema,
  updateIdeaSchema
}