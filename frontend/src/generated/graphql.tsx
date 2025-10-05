import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type Basket = {
  __typename?: 'Basket';
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  items: Array<BasketItem>;
  updatedAt: Scalars['String']['output'];
};

export type BasketItem = {
  __typename?: 'BasketItem';
  id: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isVIP: Scalars['Boolean']['output'];
  loyaltyPoints: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  registeredDate: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addToBasket?: Maybe<Basket>;
  checkout: Order;
};


export type MutationAddToBasketArgs = {
  customerId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCheckoutArgs = {
  customerId: Scalars['ID']['input'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  customerId: Scalars['ID']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  status: Scalars['String']['output'];
  subtotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  id: Scalars['ID']['output'];
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
  unitPrice: Scalars['Float']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  sku: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getBasket?: Maybe<Basket>;
  product?: Maybe<Product>;
  products: Array<Product>;
};


export type QueryGetBasketArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string, description: string, price: number, category: string, sku: string, imageUrl?: string | null }> };

export type ProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductQuery = { __typename?: 'Query', product?: { __typename?: 'Product', id: string, name: string, description: string, price: number, category: string, sku: string, imageUrl?: string | null } | null };

export type GetBasketQueryVariables = Exact<{
  customerId: Scalars['ID']['input'];
}>;


export type GetBasketQuery = { __typename?: 'Query', getBasket?: { __typename?: 'Basket', id: string, customerId: string, updatedAt: string, items: Array<{ __typename?: 'BasketItem', id: string, productId: string, quantity: number }> } | null };

export type AddToBasketMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AddToBasketMutation = { __typename?: 'Mutation', addToBasket?: { __typename?: 'Basket', id: string, customerId: string, updatedAt: string, items: Array<{ __typename?: 'BasketItem', id: string, productId: string, quantity: number }> } | null };

export type CheckoutMutationVariables = Exact<{
  customerId: Scalars['ID']['input'];
}>;


export type CheckoutMutation = { __typename?: 'Mutation', checkout: { __typename?: 'Order', id: string, customerId: string, subtotal: number, discount: number, total: number, status: string, createdAt: string, items: Array<{ __typename?: 'OrderItem', id: string, productId: string, quantity: number, unitPrice: number }> } };


export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    description
    price
    category
    sku
    imageUrl
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const ProductDocument = gql`
    query Product($id: ID!) {
  product(id: $id) {
    id
    name
    description
    price
    category
    sku
    imageUrl
  }
}
    `;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables> & ({ variables: ProductQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export function useProductSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductSuspenseQueryHookResult = ReturnType<typeof useProductSuspenseQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export const GetBasketDocument = gql`
    query GetBasket($customerId: ID!) {
  getBasket(customerId: $customerId) {
    id
    customerId
    updatedAt
    items {
      id
      productId
      quantity
    }
  }
}
    `;

/**
 * __useGetBasketQuery__
 *
 * To run a query within a React component, call `useGetBasketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBasketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBasketQuery({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useGetBasketQuery(baseOptions: Apollo.QueryHookOptions<GetBasketQuery, GetBasketQueryVariables> & ({ variables: GetBasketQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBasketQuery, GetBasketQueryVariables>(GetBasketDocument, options);
      }
export function useGetBasketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBasketQuery, GetBasketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBasketQuery, GetBasketQueryVariables>(GetBasketDocument, options);
        }
export function useGetBasketSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetBasketQuery, GetBasketQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetBasketQuery, GetBasketQueryVariables>(GetBasketDocument, options);
        }
export type GetBasketQueryHookResult = ReturnType<typeof useGetBasketQuery>;
export type GetBasketLazyQueryHookResult = ReturnType<typeof useGetBasketLazyQuery>;
export type GetBasketSuspenseQueryHookResult = ReturnType<typeof useGetBasketSuspenseQuery>;
export type GetBasketQueryResult = Apollo.QueryResult<GetBasketQuery, GetBasketQueryVariables>;
export const AddToBasketDocument = gql`
    mutation AddToBasket($customerId: ID!, $productId: ID!, $quantity: Int!) {
  addToBasket(customerId: $customerId, productId: $productId, quantity: $quantity) {
    id
    customerId
    updatedAt
    items {
      id
      productId
      quantity
    }
  }
}
    `;
export type AddToBasketMutationFn = Apollo.MutationFunction<AddToBasketMutation, AddToBasketMutationVariables>;

/**
 * __useAddToBasketMutation__
 *
 * To run a mutation, you first call `useAddToBasketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToBasketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToBasketMutation, { data, loading, error }] = useAddToBasketMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *      productId: // value for 'productId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAddToBasketMutation(baseOptions?: Apollo.MutationHookOptions<AddToBasketMutation, AddToBasketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddToBasketMutation, AddToBasketMutationVariables>(AddToBasketDocument, options);
      }
export type AddToBasketMutationHookResult = ReturnType<typeof useAddToBasketMutation>;
export type AddToBasketMutationResult = Apollo.MutationResult<AddToBasketMutation>;
export type AddToBasketMutationOptions = Apollo.BaseMutationOptions<AddToBasketMutation, AddToBasketMutationVariables>;
export const CheckoutDocument = gql`
    mutation Checkout($customerId: ID!) {
  checkout(customerId: $customerId) {
    id
    customerId
    subtotal
    discount
    total
    status
    createdAt
    items {
      id
      productId
      quantity
      unitPrice
    }
  }
}
    `;
export type CheckoutMutationFn = Apollo.MutationFunction<CheckoutMutation, CheckoutMutationVariables>;

/**
 * __useCheckoutMutation__
 *
 * To run a mutation, you first call `useCheckoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkoutMutation, { data, loading, error }] = useCheckoutMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useCheckoutMutation(baseOptions?: Apollo.MutationHookOptions<CheckoutMutation, CheckoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckoutMutation, CheckoutMutationVariables>(CheckoutDocument, options);
      }
export type CheckoutMutationHookResult = ReturnType<typeof useCheckoutMutation>;
export type CheckoutMutationResult = Apollo.MutationResult<CheckoutMutation>;
export type CheckoutMutationOptions = Apollo.BaseMutationOptions<CheckoutMutation, CheckoutMutationVariables>;