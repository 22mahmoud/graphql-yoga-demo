import User from "../../models/User.model";
import AuthService from "../../services/Auth.service";

export default {
  Query: {
    me: async (parent, args, ctx) => {
      const id = AuthService.getUserID(ctx);
      return await User.findById(id);
    }
  },
  Mutation: {
    signup: async (_, args, ctx) => {
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
