import "./App.css";
import { Provider, Client, fetchExchange, cacheExchange } from "urql";
import RouteConfig from "./routes/RouteConfig";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [fetchExchange, cacheExchange],
});

function App() {
  return (
    <Provider value={client}>
      <RouteConfig></RouteConfig>
    </Provider>
  );
}

export default App;
