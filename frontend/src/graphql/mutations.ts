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

export const UPDATE_DISCOUNT_RULE = gql`
  mutation UpdateDiscountRule($id: ID!, $input: DiscountRuleInput!) {
    updateDiscountRule(id: $id, input: $input) {
      id
      type
      name
      description
    }
  }
`;

export const DELETE_DISCOUNT_RULE = gql`
  mutation DeleteDiscountRule($id: ID!) {
    deleteDiscountRule(id: $id)
  }
`;

export const CREATE_DISCOUNT_RULE = gql`
  mutation CreateDiscountRule($input: DiscountRuleInput!) {
    createDiscountRule(input: $input) {
      id
      type
      name
      description
    }
  }
`;
