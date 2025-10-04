import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./api/schema";
import { resolvers } from "./api/resolvers";
import { PrismaClient } from "@prisma/client";
import { ProductService } from "./application/ProductService";
import { PrismaProductRepository } from "./infrastructure/repositories/PrismaProductRepository";

const prisma = new PrismaClient();
const app = express();

// Repository instances
const productRepository = new PrismaProductRepository(prisma);
// Application service instances
const productService = new ProductService(productRepository);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    prisma,
    services: {
      productService,
    },
    repositories: {
      productRepository,
    },
  }),
});

async function startServer() {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    );
  });
}

startServer().catch((error) => console.error("Failed to start server:", error));
