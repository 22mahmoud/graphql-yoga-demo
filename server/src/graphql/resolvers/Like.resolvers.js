import User from '../../models/User.model';
import Post from '../../models/Post.model';
import Like from '../../models/Like.model';
import authService from '../../services/Auth.service';

export default {
  Like: {
    user: async ({ user: id }) => {
      const user = await User.findById(id);
      return user.toJSON();
    },
  },

  Query: {
    getPostLikes: async (_, { postId }, context) => {
      authService.requireUser(context);
      const likes = await Like.where('post', postId);
      return likes;
    },
  },

  Mutation: {
    LikePostToggle: async (_, { postId }, context) => {
      const userId = authService.requireUser(context);
      const post = await Post.findById(postId);
      const isLikePost = await Like.findOne({ post: postId, user: userId });

      if (isLikePost) {
        await isLikePost.remove();
        await post.decLikesCount();
        return 'Disliked';
      }

      await Like.create({ post: postId, user: userId });
      post.incLikesCount();
      return 'Liked';
    },
  },
};
