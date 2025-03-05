const Joi = require("joi");

const userRegisterValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const userLoginValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const itemValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  itemValidation,
};
