import "~/styles/globals.scss";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import React from "react";
import nextI18Next from "../utils/next-i18next";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Component {...pageProps} />
    <DefaultSeo {...require("~/utils/next-seo")} />
  </>
);

export default nextI18Next.appWithTranslation(App);
