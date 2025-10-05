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
    customerId: ID!
    items: [BasketItem!]!
    updatedAt: String!
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

  type Query {
    products: [Product!]!
    product(id: ID!): Product
    getBasket(customerId: ID!): Basket
  }

  type Mutation {
    addToBasket(customerId: ID!, productId: ID!, quantity: Int!): Basket
    updateBasketItem(customerId: ID!, productId: ID!, quantity: Int!): Basket
    removeBasketItem(customerId: ID!, productId: ID!): Basket
    checkout(customerId: ID!): Order!
  }
`;
