import { gql } from "@apollo/client";

export const GET_BASKET = gql`
  query GetBasket($customerId: ID!) {
    getBasket(customerId: $customerId) {
      customerId
      items {
        productId
        quantity
      }
      subtotal
      discount
      discountBreakdown {
        amount
        message
      }
      total
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

export const DISCOUNT_RULES_QUERY = gql`
  query DiscountRules {
    discountRules {
      id
      type
      name
      description
    }
  }
`;

export const DISCOUNT_RULE_TYPES_QUERY = gql`
  query GetDiscountRuleTypes {
    discountRuleTypes {
      type
      label
      description
      fields {
        name
        label
        type
        options
      }
    }
  }
`;
