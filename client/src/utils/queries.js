import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query users {
    users {
      username
    }
  }
`;

export const QUERY_MEALS = gql`
  query meals {
    meals {
      mealName
      id
      protein
      carbs
      fat
      price
      img
    }
  }
`;
