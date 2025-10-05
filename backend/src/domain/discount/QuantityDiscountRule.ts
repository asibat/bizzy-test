import { DiscountRule, DiscountContext, DiscountResult } from "./DiscountRule";

export class QuantityDiscountRule implements DiscountRule {
  constructor(
    public readonly name: string,
    public readonly description: string,
    private productId: string,
    private minQty: number,
    private percentOff: number
  ) {}

  apply(ctx: DiscountContext): DiscountResult {
    const item = ctx.basket.items.find((i) => i.productId === this.productId);
    if (item && item.quantity >= this.minQty) {
      const product = ctx.products.find((p) => p.id === this.productId);
      if (product) {
        const discount =
          item.quantity * product.price * (this.percentOff / 100);
        return {
          amount: discount,
          message: this.description,
        };
      }
    }
    return { amount: 0, message: "" };
  }
}
