import "./App.css";
import { Provider, Client, fetchExchange, cacheExchange } from "urql";
import RouteConfig from "./routes/RouteConfig";
import { Suspense } from "react";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [fetchExchange, cacheExchange],
});

function App() {
  return (
    <Suspense fallback="loading">
      <Provider value={client}>
        <RouteConfig></RouteConfig>
      </Provider>
    </Suspense>
  );
}

export default App;
