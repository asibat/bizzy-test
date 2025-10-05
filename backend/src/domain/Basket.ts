import { Product } from "@prisma/client";

export interface BasketItem {
  productId: string;
  quantity: number;
  id?: string;
}
export interface Basket {
  id: string;
  customerId: string;
  items: BasketItem[];
  updatedAt: Date;
}
