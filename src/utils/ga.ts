import ReactGA from "react-ga";

ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "", {
  debug: process.env.NODE_ENV !== "production",
});

export const changePage = (url: string) => {
  ReactGA.pageview(url);
};
