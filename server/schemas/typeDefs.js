const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Auth {
    user: User
    token: ID
  }

  type Meal {
    id: ID!
    mealName: String!
    mealDes: String
    protein: Int!
    fat: Int!
    carbs: Int!
    price: Float!
    img: String!
  }

  type Query {
    meals: [Meal]!
    users: [User]!
    user(id: ID): User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
