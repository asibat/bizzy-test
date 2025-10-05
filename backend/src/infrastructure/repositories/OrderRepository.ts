import { Order } from "../../domain/Order";
import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client"; // Import for generated types

export interface IOrderRepository {
  findById(id: string): Promise<Order | null>;
  findByCustomerId(customerId: string): Promise<Order[]>;
  findByStatus(status: "PENDING" | "COMPLETED" | "CANCELLED"): Promise<Order[]>;
  create(order: Omit<Order, "id" | "createdAt">): Promise<Order>;
  updateStatus(
    id: string,
    status: "PENDING" | "COMPLETED" | "CANCELLED"
  ): Promise<Order | null>;
  delete(id: string): Promise<boolean>;
}

export class PrismaOrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    return order ? this.toDomain(order) : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { customerId },
      include: { items: true },
    });
    return orders.map(this.toDomain);
  }

  async findByStatus(
    status: "PENDING" | "COMPLETED" | "CANCELLED"
  ): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { status },
      include: { items: true },
    });
    return orders.map(this.toDomain);
  }

  async create(order: Omit<Order, "id" | "createdAt">): Promise<Order> {
    const orderData: Prisma.OrderCreateInput = {
      customer: {
        connect: { id: order.customerId },
      },
      subtotal: order.subtotal,
      discount: order.discount,
      total: order.total,
      status: order.status,
      items: {
        create: order.items.map((item) => ({
          product: {
            connect: { id: item.productId },
          },
          quantity: item.quantity,
          unitPrice: item.unitPrice,
        })),
      },
    };

    const created = await this.prisma.order.create({
      data: orderData,
      include: { items: true },
    });

    return this.toDomain(created);
  }

  async updateStatus(
    id: string,
    status: "PENDING" | "COMPLETED" | "CANCELLED"
  ): Promise<Order | null> {
    const updated = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true },
    });
    return updated ? this.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.order.delete({ where: { id } });
    return true;
  }

  private toDomain(prismaOrder: any): Order {
    return {
      id: prismaOrder.id,
      customerId: prismaOrder.customerId,
      items: prismaOrder.items.map((item: any) => ({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      subtotal: prismaOrder.subtotal,
      discount: prismaOrder.discount,
      total: prismaOrder.total,
      status: prismaOrder.status,
      createdAt: prismaOrder.createdAt,
    };
  }
}
