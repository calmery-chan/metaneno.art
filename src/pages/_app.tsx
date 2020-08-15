import NextApp from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";
import "~/styles/index.css";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

class App extends NextApp {
  public render = () => {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Component {...pageProps} />
        <GlobalStyle />
      </>
    );
  };
}

export default App;
