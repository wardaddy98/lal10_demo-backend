import bcrypt from 'bcrypt';
import _ from 'lodash';
import { UserModel } from '../../models/user.model.js';
import { handleResponse } from '../../utils/responseUtils.js';

export const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password } = req.body;

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

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    });

    //return jwt
    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'User created successfully',
    });
  } catch (err) {
    console.log(err);
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};
