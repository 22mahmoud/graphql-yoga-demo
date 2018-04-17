import AuthService from "../../services/Auth.service";

import User from "../../models/User.model";
import Post from "../../models/Post.model";

export default {
  Query: {
    me: async (parent, args) => {
      const id = AuthService.getUserID({ context: ctx });
      const { email, _id, name } = await User.findById(id);
      return { email, id: _id, name };
    }
  },
  Mutation: {
    signup: async (_, args) => {
      const user = await User.create(args);
      return {
        token: user.createToken(),
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error(`No user found for email: ${email}`);
      }

      const valid = user.authanticateUser(password);
      if (!valid) {
        throw new Error(`Invalid password`);
      }

      return {
        token: user.createToken(),
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      };
    }
  }
};
