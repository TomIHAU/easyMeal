import { gql } from "@apollo/client";

export const QUERY_ALL_USERS = gql`
  query users {
    users {
      username
    }
  }
`;

export const QUERY_ONE_USERS = gql`
  query user($id: Int!) {
    user(id: $id) {
      username
    }
  }
`;

export const QUERY_MEALS = gql`
  query meals {
    meals {
      mealName
      mealDes
      id
      protein
      carbs
      fat
      price
      img
    }
  }
`;

export const QUERY_USER_PURCHASES = gql`
  query myPurchases($user_id: ID!) {
    myPurchases(user_id: $user_id) {
      user_id {
        username
      }
      buyDate
    }
  }
`;
