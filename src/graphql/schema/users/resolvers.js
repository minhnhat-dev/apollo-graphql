/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const { UserService, PostService } = require('../../../services');
const { AuthUtils, BcryptUtils } = require('../../../utils');

const UserResolvers = {
  Result: {
    __resolveType(obj, context, info) {
      if (obj.post) {
        return 'Post';
      }

      if (obj.user) {
        return 'User';
      }
      return null;
    },
  },
  Person: {
    __resolveType(obj, context, info) {
      if (obj.vip) {
        return 'PersonVIP';
      }

      if (obj.normal) {
        return 'PersonNormal';
      }
      return null;
    },
  },
  User: {
    id: (user) => user._id,
    posts: async ({ id }) => PostService.find({ userId: id }),
  },
  Query: {
    users: async (root, args) => UserService.find(),
    user: async (root, { id }) => {
      UserService.findOne({ _id: id });
    },
    search: (root, args) => {
      const search = [
        { post: 1, message: 'Post', content: 'Post content' },
        { user: 1, message: 'User', email: 'user@gmail.com' },
        { post: 1, message: 'Post', content: 'Post content' },
      ];
      return search;
    },
    persons: (root, args) => {
      const persons = [
        { name: 'person VIP', vip: true, age: 33 },
        { name: 'person VIP', vip: true, age: 34 },
        { name: 'person normal', normal: true, age: 35 },
        { name: 'person normal', normal: true, age: 36 },
      ];
      return persons;
    },
  },
  Mutation: {
    register: async (root, { name, email, password }) => {
      const count = await UserService.count({ email });
      if (count) {
        throw new createError.BadRequest('Email is exist');
      }
      const user = await UserService.create({ name, email, password });
      /* register token */
      const token = AuthUtils.sign({ id: user.id });
      return {
        token,
        user,
      };
    },
    login: async (root, { email, password }) => {
      const user = await UserService.findOne({ email });

      if (!user) {
        throw new createError.BadRequest('Invalid email or password');
      }
      const correctPassword = BcryptUtils.comparePassword(password, user.password);

      if (!correctPassword) {
        throw new createError.BadRequest('Invalid email or password');
      }
      return {
        token: AuthUtils.sign({ id: user._id }),
        user,
      };
    },
  },

};

module.exports = UserResolvers;
