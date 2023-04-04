import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Graph from "./Graph";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
  }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">test</div>
      <Graph></Graph>
    </ApolloProvider>
  );
}

export default App;
