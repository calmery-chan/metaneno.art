import "~/styles/globals.scss";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import React from "react";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Component {...pageProps} />
    <DefaultSeo {...require("~/utils/next-seo")} />
  </>
);

export default App;
