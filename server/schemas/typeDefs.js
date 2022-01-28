const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
`;

module.exports = typeDefs;
