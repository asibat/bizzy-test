import { Product } from "../domain/Product";
import { PrismaProductRepository } from "../infrastructure/repositories/ProductRepository";

export class ProductService {
  constructor(private productRepository: PrismaProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async addProduct(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }
}
