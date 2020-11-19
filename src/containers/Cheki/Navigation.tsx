import { css } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { selectors, useSelector } from "~/domains";
import { fadeIn, fadeOut, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  box-sizing: content-box;
  display: flex;
  height: 32px;
  padding: ${Spacing.l}px;
`;

const IconContainer = styled.div`
  ${Mixin.animation};
  ${Mixin.clickable};

  cursor: pointer;
  margin-right: ${Spacing.l}px;

  &:last-child {
    margin-left: auto;
    margin-right: 0;
  }
`;

const Icon = styled.object`
  filter: brightness(0) invert(63%);
  height: 32px;
  pointer-events: none;

  &.active {
    filter: none;
  }
`;

const disabled = css`
  cursor: auto;
`;

const NavigationIcon: React.FC<{
  href: string;
  src: string;
  always?: boolean;
}> = ({ always = false, href, src }) => {
  const { pathname, push } = useRouter();
  const { ready } = useSelector(selectors.cheki);

  const handleOnClick = useCallback(() => {
    if (!ready) {
      return;
    }

    push(href);
  }, [ready]);

  return (
    <IconContainer
      onClick={handleOnClick}
      css={
        !always &&
        (ready
          ? fadeIn
          : css`
              ${fadeOut};
              ${disabled}
            `)
      }
    >
      <Icon
        className={classnames({ active: pathname === href })}
        data={src}
        type="image/svg+xml"
      />
    </IconContainer>
  );
};

export const ChekiNavigation = () => (
  <Container>
    <NavigationIcon always href="/cheki" src="/camera.svg" />
    <NavigationIcon href="/cheki/filters" src="/filters.svg" />
    <NavigationIcon href="/cheki/frames" src="/frames.svg" />
    <NavigationIcon href="/cheki/save-and-share" src="/save-and-share.svg" />
  </Container>
);
