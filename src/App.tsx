import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import RouteConfig from "./routes/RouteConfig";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RouteConfig></RouteConfig>
    </ApolloProvider>
  );
}

export default App;
