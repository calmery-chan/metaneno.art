import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import NextApp from "next/app";
import React from "react";
import { createGlobalStyle } from "styled-components";
import "~/styles/index.css";

const GlobalStyle = createGlobalStyle`
  html, body, #__next {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
  }
`;

class App extends NextApp {
  public render = () => {
    const { Component, pageProps } = this.props;

    return (
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      >
        <Component {...pageProps} />
        <GlobalStyle />
      </GoogleReCaptchaProvider>
    );
  };
}

export default App;
