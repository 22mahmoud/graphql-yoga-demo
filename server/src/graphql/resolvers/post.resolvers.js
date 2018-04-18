import authService from '../../services/Auth.service';
import User from '../../models/User.model';
import Post from '../../models/Post.model';

export default {
  Post: {
    author: async ({ author }) => {
      const user = await User.findById(author);
      return user.toJSON();
    },
  },
  Query: {
    getAllposts: async () => {
      try {
        const posts = await Post.find({});
        return posts;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    createPost: async (_, args, context) => {
      const userId = authService.requireUser(context);

      const post = await Post.create({ ...args, author: userId });

      return post;
    },
    updatePost: async (_, { postId, ...args }, context) => {
      try {
        const userId = authService.requireUser(context);

        const post = await Post.findById(postId);

        if (!post) {
          throw new Error('there is no post with this id');
        }

        if (!post.author.equals(userId)) {
          throw new Error("You don't have a permission to delete this post ");
        }

        Object.keys(args).forEach((a) => {
          post[a] = args[a];
        });
        return await post.save();
      } catch (error) {
        throw error;
      }
    },

    deletePost: async (_, { postId }, context) => {
      try {
        const userId = authService.requireUser(context);

        const post = await Post.findById(postId);

        if (!post) {
          throw new Error('there is no post with this id');
        }

        if (!post.author.equals(userId)) {
          throw new Error("You don't have a permission to delete this post ");
        }

        await post.remove();
        return 'ok';
      } catch (error) {
        throw error;
        return 'failed';
      }
    },
  },
};
