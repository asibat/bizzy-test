import type { DiscountResult } from "./DiscountRule";

export type BasketItem = {
  id: string;
  quantity: number;
  productId: string;
};

export type BasketState = {
  items: BasketItem[];
  subtotal?: number;
  discount?: number;
  discountBreakdown?: DiscountResult[];
  total?: number;
};

export type BasketQueryResult = {
  getBasket: {
    customerId: string;
    items: BasketItem[];
    subtotal: number;
    discount: number;
    discountBreakdown: { amount: number; message: string }[];
    total: number;
  };
};
