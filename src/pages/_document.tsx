import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { GoogleAnalytics } from "~/utils/google-analytics";

export default class MyDocument extends Document {
  static async getInitialProps(context: any) {
    return await Document.getInitialProps(context);
  }

  render() {
    return (
      <Html>
        <Head>
          <GoogleAnalytics />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
