import { PrismaClient } from "@prisma/client";
import { ProductService } from "../application/ProductService";
import { IProductRepository } from "../infrastructure/repositories/ProductRepository";
import { BasketService } from "../application/BasketService";
import { DiscountRuleService } from "../application/DiscountRuleService";
import { ICustomerRepository } from "../infrastructure/repositories/CustomerRepository";
import { IBasketRepository } from "../infrastructure/repositories/BasketRepository";
import { IDiscountRuleRepository } from "../infrastructure/repositories/DiscountRuleRepository";

export interface GQLContext {
  prisma: PrismaClient;
  services: {
    productService: ProductService;
    basketService: BasketService;
    discountRuleService: DiscountRuleService;
  };
  repositories: {
    productRepository: IProductRepository;
    customerRepository: ICustomerRepository;
    basketRepository: IBasketRepository;
    discountRuleRepository: IDiscountRuleRepository;
  };
}
