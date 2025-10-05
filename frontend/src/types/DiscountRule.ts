export type DiscountRule = {
  id: string;
  type: string;
  name: string;
  description?: string | null;
  config: Record<string, unknown>;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type DiscountResult = {
  amount: number;
  message: string;
};

export type DiscountRuleInput = Omit<
  DiscountRule,
  "id" | "createdAt" | "updatedAt"
>;
