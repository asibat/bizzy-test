import {
  Prisma,
  PrismaClient,
  DiscountRule as PrismaDiscountRule,
} from "@prisma/client";

export interface IDiscountRuleRepository {
  findMany(
    where?: Prisma.DiscountRuleWhereInput
  ): Promise<PrismaDiscountRule[]>;
  findUnique(id: string): Promise<PrismaDiscountRule | null>;
  create(input: Prisma.DiscountRuleCreateInput): Promise<PrismaDiscountRule>;
  update(
    id: string,
    input: Prisma.DiscountRuleCreateInput
  ): Promise<PrismaDiscountRule>;
  delete(id: string): Promise<boolean>;
  getDiscountRules(): Promise<any[]>;
}
export class PrismaDiscountRuleRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async findMany(
    where?: Prisma.DiscountRuleWhereInput
  ): Promise<PrismaDiscountRule[]> {
    return this.prisma.discountRule.findMany({
      where,
    });
  }

  async findUnique(id: string): Promise<PrismaDiscountRule | null> {
    return this.prisma.discountRule.findUnique({ where: { id } });
  }

  async create(
    input: Prisma.DiscountRuleCreateInput
  ): Promise<PrismaDiscountRule> {
    return this.prisma.discountRule.create({ data: input });
  }

  async update(
    id: string,
    input: Prisma.DiscountRuleCreateInput
  ): Promise<PrismaDiscountRule> {
    return this.prisma.discountRule.update({ where: { id }, data: input });
  }

  async delete(id: string): Promise<boolean> {
    await this.prisma.discountRule.delete({ where: { id } });
    return true;
  }
}
