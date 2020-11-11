import Head from "next/head";
import React from "react";
import { defaultSeoProps } from "~/utils/next-seo";

export type DefaultHeadKeys =
  | "apple-touch-icon"
  | "icon"
  | "manifest"
  | "mask-icon"
  | "theme-color";

export const DefaultHead: React.FC = ({ children }) => (
  <Head>
    {/* apple-touch-icon は 180x180px、PNG 形式で作成する、自動でリサイズされる */}
    <link
      href="/apple-touch-icon.png"
      key={"apple-touch-icon" as DefaultHeadKeys}
      rel="apple-touch-icon"
    />

    <link
      href="/icon.png"
      key={"icon" as DefaultHeadKeys}
      rel="icon"
      sizes="192x192"
      type="image/png"
    />

    <link
      href="/manifest.json"
      key={"manifest" as DefaultHeadKeys}
      rel="manifest"
    />

    {/* Safari のピンで表示される SVG のアイコンを設定する、`color` で指定した色で表示されるので注意する */}
    <link
      color="#fff"
      href="/mask-icon.svg"
      key={"mask-icon" as DefaultHeadKeys}
      rel="mask-icon"
    />

    <meta
      name="format-detection"
      content="address=no, email=no, telephone=no"
    />

    <meta
      content="#000"
      key={"theme-color" as DefaultHeadKeys}
      name="theme-color"
    />

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <title>{defaultSeoProps.title}</title>

    {children}
  </Head>
);
