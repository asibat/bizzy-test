import { DiscountContext, DiscountResult, DiscountRule } from "../DiscountRule";

export class VipCustomerDiscountRule implements DiscountRule {
  constructor(private percentOff: number) {}

  apply(ctx: DiscountContext): DiscountResult {
    if (!ctx.customer.isVIP) {
      return { amount: 0, message: "" };
    }
    const total = ctx.basket.items.reduce(
      (sum: number, item: { productId: any; quantity: number }) => {
        const product = ctx.products.find(
          (p: { id: any }) => p.id === item.productId
        );
        return sum + (product?.price || 0) * item.quantity;
      },
      0
    );
    return {
      amount: total * (this.percentOff / 100),
      message: `VIP Customer ${this.percentOff}% discount`,
    };
  }
}
