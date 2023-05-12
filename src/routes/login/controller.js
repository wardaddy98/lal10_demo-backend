import bcrypt from 'bcrypt';
import _ from 'lodash';
import { UserModel } from '../../models/user.model.js';
import { handleResponse } from '../../utils/responseUtils.js';

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await UserModel.findOne({ userName });
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

    //return jwt
    return handleResponse(res, {
      type: 'SUCCESS',
      message: 'User logged in successfully',
      body: {},
    });
  } catch (err) {
    res.json(err);
  }
};
