import { Basket, BasketItem, Customer, Product } from "@prisma/client";

export interface DiscountRule {
  apply(ctx: DiscountContext): DiscountResult;
}

export type DiscountContext = {
  basket: Basket & { items: Omit<BasketItem, "basketId">[] };
  products: Product[];
  customer: Omit<Customer, "createdAt" | "updatedAt">;
  orderHistory: Array<{ id: string; total: number; date: string }>;
};

export type DiscountResult = {
  amount: number; // discount amount in currency
  message: string; // explanation for the discount
};
