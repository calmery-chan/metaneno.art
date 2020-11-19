import styled from "@emotion/styled";
import { DefaultSeoProps, NextSeo } from "next-seo";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { selectors, useSelector } from "~/domains";
import { GradientColors } from "~/styles/colors";
import { Media } from "~/styles/media";
import { Spacing } from "~/styles/spacing";
import { defaultSeoProps } from "~/utils/cheki";

export const Container = styled.div<{ margin?: boolean }>`
  background: ${GradientColors.page};
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  position: fixed;
  width: 100%;

  ${Media.queries.pc} {
    padding: 0 ${({ margin }) => (margin ? `${Spacing.xl}px` : 0)};
  }

  ${Media.queries.sp} {
    padding: 0 ${({ margin }) => (margin ? `${Spacing.l}px` : 0)};
  }
`;

export const ChekiApp: React.FC<{
  className?: string;
  seoProps?: DefaultSeoProps;
}> = ({ children, className, seoProps }) => {
  const { pathname, push } = useRouter();
  const { ready } = useSelector(selectors.cheki);

  useEffect(() => {
    if (!ready && pathname !== "/cheki") {
      push("/cheki");
    }
  }, [ready]);

  return (
    <>
      <NextSeo
        {...{
          ...defaultSeoProps,
          ...seoProps,
        }}
      />

      <Container className={className}>{children}</Container>
    </>
  );
};
