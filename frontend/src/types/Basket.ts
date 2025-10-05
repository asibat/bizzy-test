export type BasketItem = {
  quantity: number;
  productId: string;
};

export type Basket = {
  customerId: string;
  items: BasketItem[];
};

export type BasketQueryResult = {
  getBasket: {
    customerId: string;
    items: BasketItem[];
  };
};
