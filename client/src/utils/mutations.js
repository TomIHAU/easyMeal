import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        id
        email
        username
      }
    }
  }
`;

export const ADD_PRODUCT_ORDER = gql`
  mutation addPurchase($user_id: ID!, $purchases: [purchases]!) {
    addPurchase(user_id: $user_id, purchases: $purchases) {
      buyDate
      user_id {
        username
      }
    }
  }
`;

// export const
// mutation addPurchase($user_id: ID!, $meal_id: ID!, $qty: Int!) {
//     addPurchase(user_id: $user_id, meal_id: $meal_id, qty: $qty) {
//       qty
//       buyDate
//       user_id {
//         username
//       }
//       meal_id {
//         mealName
//       }
//     }
//   }
