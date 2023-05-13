import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import _ from 'lodash';
import { JWT_SECRET_KEY } from '../../constants.js';
import { UserModel } from '../../models/user.model.js';
import { handleResponse } from '../../utils/responseUtils.js';
import { loginValidationSchema } from './validationSchema.js';

export const login = async (req, res) => {
  try {
    const data = await loginValidationSchema.validateAsync(req.body);
    const { userName, password } = data;

    const user = await UserModel.findOne({ userName }, { __v: 0 }).lean();
    if (_.isEmpty(user)) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'Invalid User name',
      });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    if (!isPassMatch) {
      return handleResponse(res, {
        type: 'BAD_REQUEST',
        message: 'Invalid user name and password combination',
      });
    }

    delete user.password;
    const token = Jwt.sign(user, JWT_SECRET_KEY);

    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'User logged in successfully',
      body: { token },
    });
  } catch (err) {
    console.log(err);
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
