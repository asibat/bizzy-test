import { gql } from "apollo-server-express";

export const typeDefs = gql`
  scalar JSON

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    sku: String!
    imageUrl: String
  }

  type Customer {
    id: ID!
    name: String!
    email: String!
    isVIP: Boolean!
    registeredDate: String!
    loyaltyPoints: Int!
  }

  type BasketItem {
    id: ID!
    productId: ID!
    quantity: Int!
  }

  type Basket {
    id: ID!
    customerId: String!
    items: [BasketItem!]!
    subtotal: Float!
    discount: Float!
    discountBreakdown: [DiscountResult!]!
    total: Float!
    createdAt: String!
    updatedAt: String!
  }

  type DiscountResult {
    amount: Float!
    message: String!
  }

  type OrderItem {
    id: ID!
    productId: ID!
    quantity: Int!
    unitPrice: Float!
  }

  type Order {
    id: ID!
    customerId: ID!
    items: [OrderItem!]!
    subtotal: Float!
    discount: Float!
    total: Float!
    status: String!
    createdAt: String!
  }

  type DiscountRule {
    id: String!
    type: String!
    name: String!
    description: String
    config: JSON
    enabled: Boolean
  }

  input DiscountRuleInput {
    type: String!
    name: String!
    description: String
    config: JSON!
    enabled: Boolean
  }

  type DiscountRuleTypeField {
    name: String!
    label: String!
    type: String! # e.g. 'number' | 'text' | 'select'
    options: [String!] # if selectable
  }

  type DiscountRuleType {
    type: String!
    label: String!
    description: String
    fields: [DiscountRuleTypeField!]!
  }

  input CreateDiscountRuleInput {
    type: String!
    name: String!
    description: String
    config: JSON!
    enabled: Boolean
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    getBasket(customerId: ID!): Basket
    discountRules: [DiscountRule!]!
    discountRule(id: ID!): DiscountRule
  }

  type Mutation {
    addToBasket(customerId: ID!, productId: ID!, quantity: Int!): Basket
    updateBasketItem(customerId: ID!, productId: ID!, quantity: Int!): Basket
    removeBasketItem(customerId: ID!, productId: ID!): Basket
    createDiscountRule(input: DiscountRuleInput!): DiscountRule!
    updateDiscountRule(id: ID!, input: DiscountRuleInput!): DiscountRule!
    deleteDiscountRule(id: ID!): Boolean!
    discountRuleTypes: [DiscountRuleType!]!
  }
`;
