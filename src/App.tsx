import "./App.css";
import { Provider, Client, fetchExchange, cacheExchange } from "urql";
import RouteConfig from "./routes/RouteConfig";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/common/ErrorFallback";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [fetchExchange, cacheExchange],
  suspense: true,
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider value={client}>
        <RouteConfig></RouteConfig>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
