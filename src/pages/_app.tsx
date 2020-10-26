import "~/styles/globals.scss";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import React from "react";
import { withI18n } from "../utils/i18n";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Component {...pageProps} />
    <DefaultSeo {...require("~/utils/next-seo")} />
  </>
);

export default withI18n(App);
