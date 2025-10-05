import { DiscountRule, DiscountContext, DiscountResult } from "./DiscountRule";

export class VipCustomerDiscountRule implements DiscountRule {
  constructor(
    public readonly name: string = "VIP Discount",
    public readonly description: string = "VIP customers get extra discount",
    private percentOff: number
  ) {}

  apply(ctx: DiscountContext): DiscountResult {
    if (!ctx.customer.isVIP) return { amount: 0, message: "" };
    // Fake subtotal calculation
    const subtotal = ctx.basket.items.reduce((sum, item) => {
      const product = ctx.products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
    return {
      amount: subtotal * (this.percentOff / 100),
      message: this.description,
    };
  }
}
