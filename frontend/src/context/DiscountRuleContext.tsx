import React, { createContext, useContext } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import type { DiscountRule, DiscountRuleInput } from "../types/DiscountRule";
import { DISCOUNT_RULES_QUERY } from "../graphql/queries";
import {
  CREATE_DISCOUNT_RULE,
  DELETE_DISCOUNT_RULE,
  UPDATE_DISCOUNT_RULE,
} from "../graphql/mutations";

type DiscountRuleContextType = {
  discountRules: DiscountRule[];
  refetch: () => void;
  loading: boolean;
  error: Error | null;
  updateDiscountRule: (id: string, input: DiscountRuleInput) => Promise<void>;
  deleteDiscountRule: (id: string) => Promise<void>;
  createDiscountRule: (input: DiscountRuleInput) => Promise<void>;
};

const DiscountRuleContext = createContext<DiscountRuleContextType>({
  discountRules: [],
  refetch: () => {},
  loading: false,
  error: null,
  updateDiscountRule: async () => {},
  deleteDiscountRule: async () => {},
  createDiscountRule: async () => {},
});

export function DiscountRuleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading, error, refetch } = useQuery<{
    discountRules: DiscountRule[];
  }>(DISCOUNT_RULES_QUERY);

  const [updateMutation] = useMutation(UPDATE_DISCOUNT_RULE);
  const [deleteMutation] = useMutation(DELETE_DISCOUNT_RULE);
  const [createMutation] = useMutation(CREATE_DISCOUNT_RULE);

  const updateDiscountRule = async (id: string, input: DiscountRuleInput) => {
    await updateMutation({ variables: { id, input } });
    refetch();
  };

  const deleteDiscountRule = async (id: string) => {
    await deleteMutation({ variables: { id } });
    refetch();
  };

  const createDiscountRule = async (input: DiscountRuleInput) => {
    await createMutation({ variables: { input } });
    refetch();
  };

  return (
    <DiscountRuleContext.Provider
      value={{
        discountRules: data?.discountRules ?? [],
        refetch,
        loading,
        error: error ? (error as Error) : null,
        updateDiscountRule,
        deleteDiscountRule,
        createDiscountRule,
      }}
    >
      {children}
    </DiscountRuleContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDiscountRules() {
  return useContext(DiscountRuleContext);
}
