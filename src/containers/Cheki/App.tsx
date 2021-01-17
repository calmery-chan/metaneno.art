import { css } from "@emotion/react";
import { DefaultSeoProps, NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ChekiHead } from "~/components/Cheki/Head";
import { DEFAULT_SEO_PROPS } from "~/constants/cheki";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import { GradientColors } from "~/styles/colors";

// Styles

export const container = css`
  background: ${GradientColors.page};
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;
`;

// Components

export const ChekiApp: React.FC<{
  seoProps?: DefaultSeoProps;
}> = ({ children, seoProps }) => {
  const { pathname, push } = useRouter();
  const ready = useSelector(selectors.ready);

  // Side Effects

  useEffect(() => {
    if (
      !ready &&
      !(pathname === "/cheki" || pathname.startsWith("/cheki/share"))
    ) {
      // push("/cheki");
    }
  }, [ready]);

  // Render

  return (
    <>
      <ChekiHead />
      <NextSeo
        {...{
          ...DEFAULT_SEO_PROPS,
          ...seoProps,
        }}
      />
      <div css={container}>{children}</div>
    </>
  );
};
