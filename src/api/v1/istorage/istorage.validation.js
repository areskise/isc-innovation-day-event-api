const Joi = require("joi");


const getTokenSchema = {
    body: Joi.object().keys({
        file_type: Joi.string().valid("doc", "image").required(true)
    }).unknown(true),
};

module.exports = {
    getTokenSchema,
}