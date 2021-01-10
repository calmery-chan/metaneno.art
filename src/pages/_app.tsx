import "~/styles/globals.scss";
import "~/utils/sentry";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Provider } from "react-redux";
import { DefaultHead } from "~/components/DefaultHead";
import { GoogleAnalytics } from "~/components/GoogleAnalytics";
import { store } from "~/domains";
import * as GA from "~/utils/google-analytics";
import { defaultSeoProps } from "~/utils/next-seo";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", GA.changeRoute);

    return () => {
      router.events.off("routeChangeComplete", GA.changeRoute);
    };
  }, [router.events]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <DefaultHead />
      <DefaultSeo {...defaultSeoProps} />
      <GoogleAnalytics />
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </GoogleReCaptchaProvider>
  );
};

export default App;
