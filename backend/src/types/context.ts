import { PrismaClient } from "@prisma/client";
import { ProductService } from "../application/ProductService";
import { IProductRepository } from "../domain/product/IProductRepository";

export interface Context {
  prisma: PrismaClient;
  services: {
    productService: ProductService;
  };
  repositories: {
    productRepository: IProductRepository;
  };
}
