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

  type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;
