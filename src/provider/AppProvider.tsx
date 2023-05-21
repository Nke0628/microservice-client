import { Provider, Client, fetchExchange, cacheExchange } from "urql";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../components/common/ErrorFallback";

const client = new Client({
  url: process.env.REACT_APP_BFF_URL!,
  exchanges: [fetchExchange],
  suspense: true,
});

type Props = {
  children: React.ReactElement;
};

const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider value={client}>{children}</Provider>
    </ErrorBoundary>
  );
};
export default AppProvider;
