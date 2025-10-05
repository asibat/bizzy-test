import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import type { Product } from "../types/Product";
import {
  ADD_TO_BASKET,
  REMOVE_BASKET_ITEM,
  UPDATE_BASKET_ITEM,
} from "../graphql/mutations";
import { useApolloClient, useMutation, useQuery } from "@apollo/client/react";
import { GET_BASKET } from "../graphql/queries";
import type { BasketItem } from "../generated/graphql";
import type { BasketQueryResult, BasketState } from "../types/Basket";
import type { DiscountResult } from "../types/DiscountRule";
export const DEFAULT_CUSTOMER_ID = "cust-001";

type BasketAction =
  | { type: "ADD"; product: Product }
  | { type: "REMOVE"; id: string }
  | { type: "INCREMENT"; id: string }
  | { type: "DECREMENT"; id: string }
  | {
      type: "HYDRATE";
      items: BasketItem[];
      subtotal?: number;
      discount?: number;
      discountBreakdown?: DiscountResult[];
      total?: number;
    };

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
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.product,
            quantity: 1,
            productId: action.product.id,
            id: action.product.id,
          },
        ],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "HYDRATE": {
      if (state.items.length === 0) {
        // First HYDRATE (cold load), use server order
        return {
          items: action.items.map((item) => ({
            ...item,
            id: item.productId,
          })),
          subtotal: action.subtotal,
          discount: action.discount,
          discountBreakdown: action.discountBreakdown,
          total: action.total,
        };
      }

      // After first HYDRATE: sort backend items by local order
      const localOrder = state.items.map((item) => item.productId);
      const itemsFromServer = action.items.map((item) => ({
        ...item,
        id: item.productId,
      }));

      // Sort all items from the backend with local order first
      const sorted = [
        ...itemsFromServer
          .filter((item) => localOrder.includes(item.productId))
          .sort(
            (a, b) =>
              localOrder.indexOf(a.productId) - localOrder.indexOf(b.productId)
          ),
        ...itemsFromServer.filter(
          (item) => !localOrder.includes(item.productId)
        ),
      ];

      return {
        items: sorted,
        subtotal: action.subtotal,
        discount: action.discount,
        discountBreakdown: action.discountBreakdown,
        total: action.total,
      };
    }
    default:
      return state;
  }
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [basket, dispatch] = useReducer(basketReducer, { items: [] });
  const [addToBasketMutation] = useMutation(ADD_TO_BASKET);
  const [updateBasketItem] = useMutation(UPDATE_BASKET_ITEM);
  const [removeBasketItem] = useMutation(REMOVE_BASKET_ITEM);
  const client = useApolloClient();

  // 1. Hydrate on first (mount) load
  const { data } = useQuery<BasketQueryResult>(GET_BASKET, {
    variables: { customerId: DEFAULT_CUSTOMER_ID },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data?.getBasket) {
      const { items, subtotal, discount, discountBreakdown, total } =
        data.getBasket;
      dispatch({
        type: "HYDRATE",
        items,
        subtotal,
        discount,
        discountBreakdown,
        total,
      });
    }
  }, [data]);

  // 2. Silent/Background summary/totals refetch (also updates items)
  const silentlyRefetchSummary = useCallback(async () => {
    const { data } = await client.query<BasketQueryResult>({
      query: GET_BASKET,
      variables: { customerId: DEFAULT_CUSTOMER_ID },
      fetchPolicy: "network-only",
    });
    if (data?.getBasket) {
      const { items, subtotal, discount, discountBreakdown, total } =
        data.getBasket;
      dispatch({
        type: "HYDRATE",
        items,
        subtotal,
        discount,
        discountBreakdown,
        total,
      });
    }
  }, [client]);

  const addToBasket = async (product: Product) => {
    dispatch({ type: "ADD", product });
    await addToBasketMutation({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: product.id,
        quantity: 1,
      },
    });
    silentlyRefetchSummary();
  };

  const incrementItem = async (item: BasketItem) => {
    dispatch({ type: "INCREMENT", id: item.id });
    await updateBasketItem({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: item.productId,
        quantity: item.quantity + 1,
      },
    });
    silentlyRefetchSummary();
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
      });
      silentlyRefetchSummary();
    }
  };

  const removeItem = async (item: BasketItem) => {
    dispatch({ type: "REMOVE", id: item.id });
    await removeBasketItem({
      variables: {
        customerId: DEFAULT_CUSTOMER_ID,
        productId: item.productId,
      },
    });
    silentlyRefetchSummary();
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
