import Jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants.js';
import { handleResponse } from '../utils/responseUtils.js';

export const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return handleResponse(res, {
        type: 'FORBIDDEN',
        message: 'Missing access token!',
      });
    }

    const token = authHeader.split(' ')[1];

    Jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return handleResponse(res, {
          type: 'FORBIDDEN',
          message: 'Invalid access token',
        });
      }

      req.user = user;
      next();
    });
  } catch (err) {
    return handleResponse(res, {
      type: 'ERROR',
    });
  }
};
