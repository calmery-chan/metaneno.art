import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import React from "react";
import "~/styles/globals.scss";

const App = ({ Component, pageProps }: AppProps): JSX.Element => (
  <>
    <Component {...pageProps} />
    <DefaultSeo {...require("~/utils/next-seo")} />
  </>
);

export default App;
