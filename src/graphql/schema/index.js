const UserSchema = require('./users');
const PostSchema = require('./posts');
const DirectiveSchema = require('./directives');

const typeDefs = [UserSchema.types, PostSchema.types, DirectiveSchema.DirectiveType];
const resolvers = [UserSchema.resolvers, PostSchema.resolvers];
module.exports = {
  typeDefs,
  resolvers,
};
