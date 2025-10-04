import App from "./App.tsx";
import ReactDOM from "react-dom/client";

import { InMemoryCache, ApolloClient, HttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import { BasketProvider } from "./context/BasketContext.tsx";

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BasketProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BasketProvider>
);
