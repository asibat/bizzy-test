import { DiscountRule, DiscountContext, DiscountResult } from "../DiscountRule";

export class RepeatCustomerDiscountRule implements DiscountRule {
  private minOrders: number;
  private percentOff: number;

  constructor(minOrders: number, percentOff: number) {
    this.minOrders = minOrders;
    this.percentOff = percentOff;
  }

  apply(ctx: DiscountContext): DiscountResult {
    // Count qualifying orders in orderHistory
    const totalOrders = ctx.orderHistory.length;

    if (totalOrders < this.minOrders) {
      return { amount: 0, message: "" };
    }

    // Discount applies to ALL items in basket
    const subtotal = ctx.basket.items.reduce((sum, item) => {
      const product = ctx.products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const amount = subtotal * (this.percentOff / 100);

    return {
      amount,
      message: `Repeat customer (${totalOrders} orders): ${this.percentOff}% off the whole basket!`,
    };
  }
}
