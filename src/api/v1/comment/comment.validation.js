const Joi = require('joi');

const getListCommentSchema = {
  query: Joi.object().keys({
    ideaId: Joi.string().hex().length(24).required(),
    limit: Joi.number()
  }),
};

const addCommentSchema = {
  body: Joi.object().keys({
    ideaId: Joi.string().hex().length(24).required(),
    content: Joi.string().required(),
  }),
};

module.exports = {
  getListCommentSchema,
  addCommentSchema,
}