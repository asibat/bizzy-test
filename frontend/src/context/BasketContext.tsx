import React, { createContext, useContext, useReducer } from "react";
import type { Product } from "../types/Product";

type BasketItem = Product & { quantity: number };

type BasketState = {
  items: BasketItem[];
};

type BasketAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string };

const BasketContext = createContext<{
  basket: BasketState;
  dispatch: React.Dispatch<BasketAction>;
}>({ basket: { items: [] }, dispatch: () => {} });

function basketReducer(state: BasketState, action: BasketAction): BasketState {
  switch (action.type) {
    case "ADD": {
      const existing = state.items.find(
        (item) => item.id === action.product.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((item) => item.id !== action.id) };
    case "INCREMENT":
      return {
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT":
      return {
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    default:
      return state;
  }
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, dispatch] = useReducer(basketReducer, { items: [] });
  return (
    <BasketContext.Provider value={{ basket, dispatch }}>
      {children}
    </BasketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBasket() {
  return useContext(BasketContext);
}
