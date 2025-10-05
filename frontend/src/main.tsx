import App from "./App.tsx";
import ReactDOM from "react-dom/client";
import "./index.css";

import { InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BasketProvider } from "./context/BasketContext.tsx";
import { ProductProvider } from "./context/ProductContext.tsx";
import { DiscountRuleProvider } from "./context/DiscountRuleContext.tsx";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApolloProvider client={client}>
    <ProductProvider>
      <BasketProvider>
        <DiscountRuleProvider>
          <App />
        </DiscountRuleProvider>
      </BasketProvider>
    </ProductProvider>
  </ApolloProvider>
);
