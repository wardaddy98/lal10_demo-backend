import Joi from 'joi';

export const registerValidationSchema = Joi.object({
  userName: Joi.string().alphanum().min(4).max(10).required(),
  password: Joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[@!#$%^&+=])(?=.*[0-9]).{5,12}$'))
    .required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});
