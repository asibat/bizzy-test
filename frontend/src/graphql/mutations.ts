import { gql } from "@apollo/client";

export const ADD_TO_BASKET = gql`
  mutation AddToBasket($customerId: ID!, $productId: ID!, $quantity: Int!) {
    addToBasket(
      customerId: $customerId
      productId: $productId
      quantity: $quantity
    ) {
      customerId
      items {
        productId
        quantity
      }
    }
  }
`;
