const Joi = require('joi');

const genOtpSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    
  }),
};

const authenOtpSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    otp: Joi.string().required(),
    
  }),
};

module.exports = {
  genOtpSchema,
  authenOtpSchema,
}