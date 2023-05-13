import bcrypt from 'bcrypt';
import _ from 'lodash';
import { UserModel } from '../../models/user.model.js';
import { handleResponse } from '../../utils/responseUtils.js';
import { registerValidationSchema } from './validationSchema.js';

export const register = async (req, res) => {
  try {
    const { userName, email } = req.body;

    const existingEmail = await UserModel.findOne({ email });
    if (!_.isEmpty(existingEmail)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'Email already in use',
      });
    }

    const existingUserName = await UserModel.findOne({ userName });
    if (!_.isEmpty(existingUserName)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'User name already in use',
      });
    }

    const data = await registerValidationSchema.validateAsync(req.body);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    await UserModel.create({
      ...data,
      password: hashedPassword,
    });

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'User created successfully! Please log in',
    });
  } catch (err) {
    if (err?.isJoi) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: err?.details[0]?.message ?? 'Invalid values sent!',
      });
    }
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};
