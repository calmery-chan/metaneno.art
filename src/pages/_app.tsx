import { AppProps } from "next/app";
import React from "react";
import "~/styles/globals.css";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />;
};

export default App;
