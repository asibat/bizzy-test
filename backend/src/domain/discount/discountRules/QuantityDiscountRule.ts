import { DiscountContext, DiscountResult, DiscountRule } from "../DiscountRule";

export class QuantityDiscountRule implements DiscountRule {
  constructor(
    private productId: string,
    private minQty: number,
    private percentOff: number
  ) {}

  apply(ctx: DiscountContext): DiscountResult {
    const item = ctx.basket.items.find((i) => i.productId === this.productId);
    if (!item || item.quantity < this.minQty) return { amount: 0, message: "" };

    const product = ctx.products.find((p) => p.id === this.productId);
    if (!product) {
      return { amount: 0, message: "" };
    }

    return {
      amount: item.quantity * product.price * (this.percentOff / 100),
      message: `Quantity discount on ${this.productId}`,
    };
  }
}
