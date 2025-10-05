import { PrismaClient } from "@prisma/client";
import { Customer } from "../../domain/Customer";

export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findVIPCustomers(): Promise<Customer[]>;
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Partial<Customer>): Promise<Customer | null>;
  delete(id: string): Promise<boolean>;
}

export class PrismaCustomerRepository implements ICustomerRepository {
  constructor(private prisma: PrismaClient) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany();
    return customers.map(this.toDomain);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
    });
    return customer ? this.toDomain(customer) : null;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });
    return customer ? this.toDomain(customer) : null;
  }

  async findVIPCustomers(): Promise<Customer[]> {
    const customers = await this.prisma.customer.findMany({
      where: { isVIP: true },
    });
    return customers.map(this.toDomain);
  }

  async create(customer: Customer): Promise<Customer> {
    const created = await this.prisma.customer.create({
      data: customer,
    });
    return this.toDomain(created);
  }

  async update(
    id: string,
    customer: Partial<Customer>
  ): Promise<Customer | null> {
    const updated = await this.prisma.customer.update({
      where: { id },
      data: customer,
    });
    return updated ? this.toDomain(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.customer.delete({ where: { id } });
    return true;
  }

  private toDomain(prismaCustomer: any): Customer {
    return {
      id: prismaCustomer.id,
      name: prismaCustomer.name,
      email: prismaCustomer.email,
      isVIP: prismaCustomer.isVIP,
      createdAt: prismaCustomer.createdAt,
      registeredDate: prismaCustomer.registeredDate,
      loyaltyPoints: prismaCustomer.loyaltyPoints,
    };
  }
}
