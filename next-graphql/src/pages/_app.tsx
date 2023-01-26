import { FC } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../apollo";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
import "@/app/styles/globals.scss";
import store, { persistor } from "@/app/store/srote";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
