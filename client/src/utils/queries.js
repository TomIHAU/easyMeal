import { gql } from "@apollo/client";

export const QUERY_MEALS = gql`
  query meals {
    meals {
      mealName
      id
      protein
      carbs
      fat
    }
  }
`;
