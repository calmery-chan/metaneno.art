import "~/styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "~/domains";
import * as GA from "~/utils/google-analytics";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    GA.changeRoute(router.pathname);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", GA.changeRoute);

    return () => {
      router.events.off("routeChangeComplete", GA.changeRoute);
    };
  }, [router.events]);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <DefaultSeo {...require("~/utils/next-seo")} />
    </>
  );
};

export default App;
