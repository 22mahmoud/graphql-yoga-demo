import jwt from "jsonwebtoken";

import constants from "../config/constants";

const getUserID = context => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, constants.JWT_SECRET);
    return user;
  }

  throw new AuthError();
};

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

export default {
  AuthError,
  getUserID
};
