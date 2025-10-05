export type DiscountRule = {
  id: string;
  type: string;
  name: string;
  description?: string | null;
};

export type DiscountResult = {
  amount: number;
  message: string;
};
