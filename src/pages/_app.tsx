import "~/styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { withI18n } from "../utils/i18n";
import { store } from "~/domains";
import * as GA from "~/utils/ga";
import { Sentry } from "~/utils/sentry";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", (url: string) => {
      GA.changePage(url);
    });

    router.events.on("routeChangeError", (error: Error) => {
      Sentry.captureException(error);
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      <DefaultSeo {...require("~/utils/next-seo")} />
    </>
  );
};

export default withI18n(App);
