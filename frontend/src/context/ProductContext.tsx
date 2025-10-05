import React, { createContext, useContext } from "react";
import type { Product } from "../types/Product";
import { GET_PRODUCTS } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";

interface ProductContextValue {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
}
const ProductContext = createContext<ProductContextValue | undefined>(
  undefined
);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, loading, error } = useQuery<{ products: Product[] }>(
    GET_PRODUCTS
  );
  const products = data?.products || [];
  const getProductById = (id: string) => products.find((p) => p.id === id);
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error: error?.message ?? null,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
