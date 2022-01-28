const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Meal {
    id: ID!
    mealName: String!
    protein: Int!
    fat: Int!
    carbs: Int!
  }

  type Query {
    meals: [Meal]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
