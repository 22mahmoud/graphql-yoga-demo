import authService from '../../services/Auth.service';
import User from '../../models/User.model';
import Post from '../../models/Post.model';
import Comment from '../../models/Comment.model';

export default {
  // Types
  Comment: {
    author: async ({ user: id }) => {
      const user = await User.findById(id);
      return user.toJSON();
    },
  },

  // Query
  Query: {
    getPostComments: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (!post) throw Error('Post not Found!');

        const comments = await Comment.where('post', postId);
        return comments;
      } catch (error) {
        throw error;
      }
    },
  },

  // Mutation
  Mutation: {
    commentPost: async (_, { postId, text }, context) => {
      try {
        const userId = authService.requireUser(context);

        const post = await Post.findById(postId);
        if (!post) throw Error();

        const comment = await Comment.create({
          user: userId,
          post: postId,
          text,
        });

        post.incCommentsCount();
        return comment;
      } catch (error) {
        throw error;
      }
    },

    updateComment: async (_, { commentId, ...args }, context) => {
      try {
        const userId = authService.requireUser(context);

        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw new Error('there is no comment with this id');
        }

        if (!comment.user.equals(userId)) {
          throw new Error("You don't have a permission to delete this post ");
        }

        Object.keys(args).forEach((a) => {
          comment[a] = args[a];
        });
        return await comment.save();
      } catch (error) {
        throw error;
      }
    },

    deleteComment: async (_, { commentId }, context) => {
      try {
        const userId = authService.requireUser(context);

        const comment = await Comment.findById(commentId);

        if (!comment) {
          throw new Error('there is no comment with this id');
        }

        if (!comment.user.equals(userId)) {
          throw new Error("You don't have a permission to delete this post ");
        }

        await comment.remove();
        return 'ok';
      } catch (error) {
        throw error;
      }
    },
  },
};
