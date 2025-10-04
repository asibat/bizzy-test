import { PrismaClient } from "@prisma/client";
import { Product } from "../../domain/product/Product";

export class PrismaProductRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map(this.toDomain);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    return product ? this.toDomain(product) : null;
  }

  async create(product: Product): Promise<Product> {
    const p = await this.prisma.product.create({ data: product });
    return this.toDomain(p);
  }

  private toDomain(prismaProduct: Product): Product {
    return {
      id: prismaProduct.id,
      name: prismaProduct.name,
      description: prismaProduct.description,
      price: prismaProduct.price,
      category: prismaProduct.category,
      sku: prismaProduct.sku,
      imageUrl: prismaProduct.imageUrl,
    };
  }
}
