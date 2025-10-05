export interface DiscountRule {
  readonly name: string;
  readonly description: string;
  apply(ctx: DiscountContext): DiscountResult;
}

export type DiscountContext = {
  basket: {
    items: { productId: string; quantity: number }[];
  };
  customer: {
    id: string;
    isVIP: boolean;
    name: string;
  };
  orderHistory: Array<{ id: string; total: number; date: string }>;
  products: Array<{ id: string; price: number }>;
};

export type DiscountResult = {
  amount: number; // discount amount in currency
  message: string; // explanation for the discount
};
