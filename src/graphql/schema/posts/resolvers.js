const mongoose = require('mongoose');
const { UserService, PostService } = require('../../../services');

const PostResolvers = {
  Post: {
    author: async ({ userId }) => {
      const select = {
        email: 1,
        name: 1,
      };
      return UserService.findOne({ _id: userId }, { select });
    },
  },
  Query: {
    post: async (root, { id }) => PostService.findOne({ _id: id }),
    posts: async (root, { content }) => {
      const query = {};
      if (content) {
        query.content = content;
      }
      return PostService.find(query);
    },
  },
  Mutation: {
    createPost: async (root, { content, userId }) => {
      const userObjectId = new mongoose.Types.ObjectId(userId);
      return PostService.create({ content, userId: userObjectId });
    },
    deletePost: async (root, { id }) => PostService.deleteOne(id),
  },
};

module.exports = PostResolvers;
