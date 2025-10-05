// domain/discount/discountRules/WeekendDiscountRule.ts

import { DiscountRule, DiscountContext, DiscountResult } from "../DiscountRule";

export class WeekendDiscountRule implements DiscountRule {
  private productId: string;
  private minQty: number;
  private percentOff: number;

  constructor(productId: string, minQty: number, percentOff: number) {
    this.percentOff = percentOff;
    this.minQty = minQty;
    this.productId = productId;
  }

  apply(ctx: DiscountContext): DiscountResult {
    // Get today's day
    // Sunday = 0, Saturday = 6
    const today = new Date();
    const isWeekend = today.getDay() === 0 || today.getDay() === 6;
    if (!isWeekend) {
      return { amount: 0, message: "" };
    }

    // Find basket item
    const item = ctx.basket.items.find(
      (item) => item.productId === this.productId
    );
    if (!item || item.quantity < this.minQty) {
      return { amount: 0, message: "" };
    }

    // Find product
    const product = ctx.products.find((p) => p.id === this.productId);
    if (!product) {
      return { amount: 0, message: "" };
    }

    const discount = item.quantity * product.price * (this.percentOff / 100);

    return {
      amount: discount,
      message: `Weekend deal: ${this.percentOff}% off product ${product.name}!`,
    };
  }
}
