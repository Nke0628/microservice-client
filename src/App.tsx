import "./App.css";
import RouteConfig from "./routes/RouteConfig";
import AppProvider from "./provider/AppProvider";

function App() {
  return (
    <AppProvider>
      <RouteConfig></RouteConfig>
    </AppProvider>
  );
}

export default App;
