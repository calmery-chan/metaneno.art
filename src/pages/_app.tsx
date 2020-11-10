import "~/styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { DefaultHead } from "~/components/DefaultHead";
import { GoogleAnalytics } from "~/components/GoogleAnalytics";
import { store } from "~/domains";
import * as GA from "~/utils/google-analytics";
import { defaultSeoProps } from "~/utils/next-seo";

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
      <DefaultHead />
      <DefaultSeo {...defaultSeoProps} />
      <GoogleAnalytics />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;
