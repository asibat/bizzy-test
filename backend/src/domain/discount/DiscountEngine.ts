import { DiscountRule, DiscountContext, DiscountResult } from "./DiscountRule";

export class DiscountEngine {
  private rules: DiscountRule[];

  constructor(rules: DiscountRule[] = []) {
    this.rules = rules;
  }

  addRule(rule: DiscountRule) {
    this.rules.push(rule);
  }

  setRules(rules: DiscountRule[]) {
    this.rules = rules;
  }

  getRules() {
    return this.rules;
  }

  // Computes all discounts, returns total and breakdown
  applyAll(context: DiscountContext): {
    totalDiscount: number;
    breakdown: DiscountResult[];
  } {
    const results = this.rules
      .map((rule) => rule.apply(context))
      .filter((r) => r.amount > 0);
    const totalDiscount = results.reduce((sum, r) => sum + r.amount, 0);
    return { totalDiscount, breakdown: results };
  }
}
