let idCount = 0;
const posts = [];

export default {
  Query: {
    description: () => `This is the API for a simple blogging application`,
    posts: () => posts,
    post: (parent, args) => posts.find(post => post.id === args.id)
  },
  Mutation: {
    createDraft: (parent, args) => {
      const post = {
        id: `post_${idCount++}`,
        title: args.title,
        content: args.content,
        published: false
      };
      posts.push(post);
      return post;
    },
    deletePost: (parent, args) => {
      const postIndex = posts.findIndex(post => post.id === args.id);
      if (postIndex > -1) {
        const deleted = posts.splice(postIndex, 1);
        return deleted[0];
      }
      return null;
    },
    publish: (parent, args) => {
      const postIndex = posts.findIndex(post => post.id === args.id);
      posts[postIndex].published = true;
      return posts[postIndex];
    }
  }
};
