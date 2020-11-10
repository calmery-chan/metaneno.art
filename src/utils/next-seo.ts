import { DefaultSeoProps } from "next-seo";

export const defaultSeoProps: DefaultSeoProps = {
  canonical: "https://metaneno.art/",
  description:
    "怪しげなクリームソーダを飲んでゆるふわ可愛い世界にトリップ！この世界にはイラストが沢山！キャラクターとの会話を楽しみながら不思議な世界を引きこもりちゃんと一緒に探検しよ♫",
  nofollow: true, // Top ページ以外は基本 nofollow にする
  noindex: true, // Top ページ以外は基本 noindex にする
  title: "めたねのおくすり個展 クリームソーダの夢路を覗いて | めたねのあーと",

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
    description:
      "怪しげなクリームソーダを飲んでゆるふわ可愛い世界にトリップ！この世界にはイラストが沢山！キャラクターとの会話を楽しみながら不思議な世界を引きこもりちゃんと一緒に探検しよ♫",
    images: [
      {
        height: 630,
        url: "https://metaneno.art/og.png",
        width: 1200,
      },
    ],
    locale: "ja_JP",
    site_name: "めたねのあーと",
    title: "めたねのおくすり個展 クリームソーダの夢路を覗いて",
    type: "website",
    url: "https://metaneno.art/",
  },
};
