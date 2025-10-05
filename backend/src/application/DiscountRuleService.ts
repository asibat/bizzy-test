import { Prisma, DiscountRule } from "@prisma/client";
import { IDiscountRuleRepository } from "../infrastructure/repositories/DiscountRuleRepository";

export class DiscountRuleService {
  private repository: IDiscountRuleRepository;

  constructor(repository: IDiscountRuleRepository) {
    this.repository = repository;
  }

  async getDiscountRules(): Promise<DiscountRule[]> {
    return this.repository.findMany();
  }

  async getDiscountRule(id: string): Promise<DiscountRule | null> {
    return this.repository.findUnique(id);
  }

  async createDiscountRule(
    input: Prisma.DiscountRuleCreateInput
  ): Promise<DiscountRule> {
    return this.repository.create(input);
  }

  async updateDiscountRule(
    id: string,
    input: Prisma.DiscountRuleCreateInput
  ): Promise<DiscountRule> {
    return this.repository.update(id, input);
  }

  async deleteDiscountRule(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }
}
