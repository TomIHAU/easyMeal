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
    price: Float!
    img: String!
  }

  type Query {
    meals: [Meal]!
    users: [User]!
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
