import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Product } from "../types/Product";
import {
  ADD_TO_BASKET,
  REMOVE_BASKET_ITEM,
  UPDATE_BASKET_ITEM,
} from "../graphql/mutations";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_BASKET } from "../graphql/queries";
import type { BasketItem } from "../generated/graphql";
import type { BasketQueryResult } from "../types/Basket";
export const DEFAULT_CUSTOMER_ID = "cust-001";

type BasketState = {
  items: BasketItem[];
};

type BasketAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | { type: "HYDRATE"; items: BasketItem[] };

const BasketContext = createContext<{
  basket: BasketState;
  dispatch: React.Dispatch<BasketAction>;
  addToBasket: (product: Product) => void;
  incrementItem: (item: BasketItem) => void;
  decrementItem: (item: BasketItem) => void;
  removeItem: (item: BasketItem) => void;
}>({
  basket: { items: [] },
  dispatch: () => {},
  addToBasket: () => {},
  incrementItem: () => {},
  decrementItem: () => {},
  removeItem: () => {},
});

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
        items: [
          ...state.items,
          {
            ...action.product,
            quantity: 1,
            productId: action.product.id,
          },
        ],
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
    case "HYDRATE":
      return {
        items: action.items,
      };
    default:
      return state;
  }
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, dispatch] = useReducer(basketReducer, { items: [] });
  const [addToBasketMutation] = useMutation(ADD_TO_BASKET);
  const [updateBasketItem] = useMutation(UPDATE_BASKET_ITEM);
  const [removeBasketItem] = useMutation(REMOVE_BASKET_ITEM);

  const { data } = useQuery<BasketQueryResult>(GET_BASKET, {
    variables: { customerId: DEFAULT_CUSTOMER_ID },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getBasket?.items) {
      dispatch({
        type: "HYDRATE",
        items: data.getBasket.items.map((item) => ({
          ...item,
          id: item.productId,
        })),
      });
    }
  }, [data]);

  const addToBasket = async (product: Product) => {
    dispatch({ type: "ADD", product });
    await addToBasketMutation({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: product.id,
        quantity: 1,
      },
    });
  };

  const incrementItem = async (item: BasketItem) => {
    dispatch({ type: "INCREMENT", id: item.id });
    await updateBasketItem({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: item.productId,
        quantity: item.quantity + 1,
      },
      refetchQueries: [
        { query: GET_BASKET, variables: { customerId: DEFAULT_CUSTOMER_ID } },
      ],
    });
  };

  const decrementItem = async (item: BasketItem) => {
    if (item.quantity === 1) {
      await removeItem(item);
    } else {
      dispatch({ type: "DECREMENT", id: item.id });
      await updateBasketItem({
        variables: {
          customerId: DEFAULT_CUSTOMER_ID,
          productId: item.productId,
          quantity: item.quantity - 1,
        },
        refetchQueries: [
          { query: GET_BASKET, variables: { customerId: DEFAULT_CUSTOMER_ID } },
        ],
      });
    }
  };

  const removeItem = async (item: BasketItem) => {
    await removeBasketItem({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: item.productId,
      },
      refetchQueries: [
        { query: GET_BASKET, variables: { customerId: DEFAULT_CUSTOMER_ID } },
      ],
    });
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        dispatch,
        addToBasket,
        incrementItem,
        decrementItem,
        removeItem,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBasket() {
  return useContext(BasketContext);
}
