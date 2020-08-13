const { gql } = require('apollo-server-express');

const UserType = gql`
  union Result = User | Post

  interface  Person {
    name: String
    age: Int
  }

  type PersonVIP implements  Person {
    name: String @uppercase
    age: Int
    vip: Boolean @deprecated(reason: "NOT SUPORT")
  }

  type PersonNormal implements  Person {
    name: String @uppercase
    age: Int
    normal: Boolean
  }

  type User {
    id: String
    name: String
    email: String
    totalPosts: String
    active: Boolean
    posts: [Post]
  }
  type UserAuth {
    token: String,
    user: User
  }

  type Query {
    user(id: ID!): User
    users: [User!]
    search(q: String): [Result]
    persons(q: String): [Person]
  }

 type Mutation {
    register(name: String!, email: String!, password: String!): UserAuth
    login(email: String!, password: String!): UserAuth
    deleteUser(id: ID!): Boolean
    updateUser(id: ID!, name: String!): User
  }
`;

module.exports = UserType;
