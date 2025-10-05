import { PrismaClient } from "@prisma/client";
import { ProductService } from "../application/ProductService";
import { IProductRepository } from "../infrastructure/repositories/ProductRepository";

export interface Context {
  prisma: PrismaClient;
  services: {
    productService: ProductService;
  };
  repositories: {
    productRepository: IProductRepository;
  };
}
