import { Basket, Customer, Order } from "@prisma/client";

export type DiscountRuleType = "QUANTITY" | "REPEAT_CUSTOMER" | "VIP";

export interface DiscountRule {
  id: string;
  type: DiscountRuleType;
  description: string;
  config: Record<string, any>;
  apply(
    basket: Basket,
    customer: Customer,
    historicalOrders: Order[]
  ): { discount: number; message: string };
}
