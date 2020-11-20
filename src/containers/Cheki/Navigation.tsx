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

// `object` タグに `alt` を指定したいが型に存在しないため
const Icon = styled.object`
  filter: brightness(0) invert(63%);
  height: 32px;
  pointer-events: none;
  user-select: none;

  &.active {
    filter: none;
  }
` as any;

const disabled = css`
  cursor: auto;
`;

const NavigationIcon: React.FC<{
  alt: string;
  href: string;
  src: string;
  always?: boolean;
}> = ({ alt, always = false, href, src }) => {
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
        alt={alt}
        className={classnames({ active: pathname === href })}
        data={src}
        type="image/svg+xml"
      />
    </IconContainer>
  );
};

export const ChekiNavigation = () => (
  <Container>
    <NavigationIcon alt="カメラ" always href="/cheki" src="/cheki/camera.svg" />
    <NavigationIcon
      alt="フィルター"
      href="/cheki/filters"
      src="/cheki/filters.svg"
    />
    <NavigationIcon
      alt="フレーム"
      href="/cheki/frames"
      src="/cheki/frames.svg"
    />
    <NavigationIcon
      alt="保存・シェア"
      href="/cheki/save"
      src="/cheki/save.svg"
    />
  </Container>
);
