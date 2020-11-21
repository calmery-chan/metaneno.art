import Head from "next/head";
import React from "react";
import { DefaultHeadKeys } from "../DefaultHead";
import { DEFAULT_SEO_PROPS } from "~/constants/cheki";

export const ChekiHead: React.FC = ({ children }) => (
  <Head>
    <link
      href="/cheki/apple-touch-icon.png"
      key={"apple-touch-icon" as DefaultHeadKeys}
      rel="apple-touch-icon"
    />

    <link
      href="/cheki/icon.png"
      key={"icon" as DefaultHeadKeys}
      rel="icon"
      sizes="192x192"
      type="image/png"
    />

    <link
      href="/cheki/manifest.json"
      key={"manifest" as DefaultHeadKeys}
      rel="manifest"
    />

    {/* Safari のピンで表示される SVG のアイコンを設定する、`color` で指定した色で表示されるので注意する */}
    {/* <link
      color="#fff"
      href="/cheki/mask-icon.svg"
      key={"mask-icon" as DefaultHeadKeys}
      rel="mask-icon"
    /> */}

    <meta
      name="format-detection"
      content="address=no, email=no, telephone=no"
    />

    <meta
      content="#FFD74B"
      key={"theme-color" as DefaultHeadKeys}
      name="theme-color"
    />

    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

    <title>{DEFAULT_SEO_PROPS.title}</title>

    {children}
  </Head>
);
