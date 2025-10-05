import { PrismaClient } from "@prisma/client";
import { Basket, BasketItem } from "../../domain/Basket";

export interface IBasketRepository {
  findByCustomerId(customerId: string): Promise<Basket | null>;
  create(basket: Omit<Basket, "id" | "updatedAt">): Promise<Basket>;
  addItem(customerId: string, item: BasketItem): Promise<Basket>;
  updateItemQuantity(
    customerId: string,
    productId: string,
    quantity: number
  ): Promise<Basket>;
  removeItem(customerId: string, productId: string): Promise<Basket>;
  clear(customerId: string): Promise<boolean>;
}

export class PrismaBasketRepository implements IBasketRepository {
  constructor(private prisma: PrismaClient) {}

  async findByCustomerId(customerId: string): Promise<Basket | null> {
    const basket = await this.prisma.basket.findUnique({
      where: { customerId },
      include: { items: { include: { product: true } } },
    });
    return basket ? this.toDomain(basket) : null;
  }

  async create(basket: Omit<Basket, "id" | "updatedAt">): Promise<Basket> {
    const created = await this.prisma.basket.create({
      data: {
        customerId: basket.customerId,
        items: {
          create: basket.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: { include: { product: true } } },
    });
    return this.toDomain(created);
  }

  async addItem(customerId: string, item: BasketItem): Promise<Basket> {
    const existingItem = await this.prisma.basketItem.findFirst({
      where: {
        basket: { customerId },
        productId: item.productId,
      },
    });

    if (existingItem) {
      await this.prisma.basketItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    } else {
      const basket = await this.prisma.basket.findUnique({
        where: { customerId },
      });
      await this.prisma.basketItem.create({
        data: {
          basketId: basket!.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
    return this.findByCustomerId(customerId) as Promise<Basket>;
  }

  async updateItemQuantity(
    customerId: string,
    productId: string,
    quantity: number
  ): Promise<Basket> {
    await this.prisma.basketItem.updateMany({
      where: { basket: { customerId }, productId },
      data: { quantity },
    });
    return this.findByCustomerId(customerId) as Promise<Basket>;
  }

  async removeItem(customerId: string, productId: string): Promise<Basket> {
    await this.prisma.basketItem.deleteMany({
      where: { basket: { customerId }, productId },
    });
    return this.findByCustomerId(customerId) as Promise<Basket>;
  }

  async clear(customerId: string): Promise<boolean> {
    await this.prisma.basketItem.deleteMany({
      where: { basket: { customerId } },
    });
    return true;
  }

  private toDomain(prismaBasket: any): Basket {
    return {
      customerId: prismaBasket.customerId,
      items: prismaBasket.items.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
        product: item.product,
        id: item.id,
      })),
      id: prismaBasket.id,
      updatedAt: prismaBasket.updatedAt,
    };
  }
}
