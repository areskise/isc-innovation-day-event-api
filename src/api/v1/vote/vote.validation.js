const Joi = require('joi');

const addVoteSchema = {
  body: Joi.object().keys({
    ideaId: Joi.string().hex().length(24).required(),
  }),
};

const deleteVoteSchema = {
  query: Joi.object().keys({
    ideaId: Joi.string().hex().length(24).required(),
  }),
};

module.exports = {
  addVoteSchema,
  deleteVoteSchema,
}