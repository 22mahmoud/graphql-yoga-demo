import jwt from 'jsonwebtoken';

import constants from '../config/constants';

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

const requireUser = (context) => {
  try {
    const Authorization = context.request.get('Authorization');
    if (Authorization) {
      const token = Authorization.replace('Bearer ', '');
      const { id } = jwt.verify(token, constants.JWT_SECRET);
      return id;
    }

    throw new AuthError();
  } catch (error) {
    throw new AuthError();
  }
};

export default {
  AuthError,
  requireUser,
};
