import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
