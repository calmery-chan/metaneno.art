import { DefaultSeoProps } from "next-seo";

export const defaultSeoProps: DefaultSeoProps = {
  canonical: "https://metaneno.art/",
  description: "Description",
  nofollow: true, // Top ページ以外は基本 nofollow にする
  noindex: true, // Top ページ以外は基本 noindex にする
  title: "Title",

  // Twitter
  twitter: {
    cardType: "summary_large_image",
    // @username for the content creator / author (outputs as `twitter:creator`)
    handle: "@metanen0x0",
    // @username for the website used in the card footer
    site: "@metanen0x0",
  },

  // OGP
  openGraph: {
    description: "Description (Open Graph)",
    images: [
      {
        height: 320,
        url: "https://metaneno.art/og.png",
        width: 640,
      },
    ],
    locale: "ja_JP",
    site_name: "Site Name",
    title: "Title (Open Graph)",
    type: "website",
    url: "https://metaneno.art/",
  },
};
