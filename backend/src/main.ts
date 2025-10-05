import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./api/schema";
import { resolvers } from "./api/resolvers";
import { Prisma, PrismaClient } from "@prisma/client";
import { ProductService } from "./application/ProductService";
import { PrismaProductRepository } from "./infrastructure/repositories/ProductRepository";
import { BasketService } from "./application/BasketService";
import { PrismaBasketRepository } from "./infrastructure/repositories/BasketRepository";
import { PrismaDiscountRuleRepository } from "./infrastructure/repositories/DiscountRuleRepository";
import { DiscountRuleService } from "./application/DiscountRuleService";
import { PrismaCustomerRepository } from "./infrastructure/repositories/CustomerRepository";

const prisma = new PrismaClient();
const app = express();

// Repository instances
const productRepository = new PrismaProductRepository(prisma);
const basketRepository = new PrismaBasketRepository(prisma);
const discountRuleRepository = new PrismaDiscountRuleRepository(prisma);
const customerRepository = new PrismaCustomerRepository(prisma);

// Application service instances
const productService = new ProductService(productRepository);
const basketService = new BasketService(
  basketRepository,
  productRepository,
  discountRuleRepository,
  customerRepository
);
const discountRuleService = new DiscountRuleService(discountRuleRepository);

export type GraphQLContext = {
  prisma: PrismaClient;
  services: {
    productService: ProductService;
    basketService: BasketService;
    discountRuleService: DiscountRuleService;
  };
  repositories: {
    productRepository: PrismaProductRepository;
    basketRepository: PrismaBasketRepository;
    discountRuleRepository: PrismaDiscountRuleRepository;
    customerRepository: PrismaCustomerRepository;
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    prisma,
    services: {
      productService,
      basketService,
    },
    repositories: {
      productRepository,
      basketRepository,
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
