import React from "react";

const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";

// Helper Functions

const gtag = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    return (window as any).gtag;
  }

  return console.log;
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
const event = (
  action: string,
  {
    category,
    label,
    value,
  }: { category: string; label: string; value?: string }
) => {
  gtag()("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
};

// Main

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const changeRoute = (url: string) => {
  gtag()("event", "page_view", {
    page_path: url,
    send_to: GOOGLE_ANALYTICS_ID,
  });
};

export const sendDummy = () => {
  event("dummy", {
    category: "dummy-category",
    label: "dummy-label",
  });
};

// Components

export const GoogleAnalytics: React.FC = () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag("js",new Date());gtag("config","${GOOGLE_ANALYTICS_ID}",{send_page_view:false})`,
      }}
    />
  </>
);
