import { gql } from "@apollo/client";

export const GET_BASKET = gql`
  query GetBasket($customerId: ID!) {
    getBasket(customerId: $customerId) {
      id
      customerId
      items {
        id
        quantity
        productId
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products {
    products {
      id
      name
      price
      description
      category
      sku
      imageUrl
    }
  }
`;
