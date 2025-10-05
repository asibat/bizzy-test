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

export const REMOVE_BASKET_ITEM = gql`
  mutation RemoveBasketItem($customerId: ID!, $productId: ID!) {
    removeBasketItem(customerId: $customerId, productId: $productId) {
      id
      customerId
      items {
        id
        productId
        quantity
      }
      updatedAt
    }
  }
`;

export const UPDATE_BASKET_ITEM = gql`
  mutation UpdateBasketItem(
    $customerId: ID!
    $productId: ID!
    $quantity: Int!
  ) {
    updateBasketItem(
      customerId: $customerId
      productId: $productId
      quantity: $quantity
    ) {
      id
      items {
        productId
        quantity
      }
    }
  }
`;
