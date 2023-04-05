import "./App.css";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import Container from "./components/layout/Container";
import Menu from "./components/layout/Menu";
import Content from "./components/layout/Content";
import Header from "./components/layout/Header";
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
      <Container>
        <Header></Header>
        <Menu></Menu>
        <Content>
          <RouteConfig></RouteConfig>
        </Content>
      </Container>
    </ApolloProvider>
  );
}

export default App;
