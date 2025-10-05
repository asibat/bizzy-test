export interface OrderItem {
  id?: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
}
