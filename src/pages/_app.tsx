import "~/styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { withI18n } from "../utils/i18n";
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
      <Component {...pageProps} />
      <DefaultSeo {...require("~/utils/next-seo")} />
    </>
  );
};

export default withI18n(App);
