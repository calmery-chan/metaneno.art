import classnames from "classnames";
import { css } from "linaria";
import { styled } from "linaria/react";
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

const Image = styled.img`
  ${Mixin.animation};
  ${Mixin.clickable};

  cursor: pointer;
  filter: brightness(0) invert(63%);
  height: 32px;
  margin-right: ${Spacing.l}px;

  &:last-child {
    margin-left: auto;
    margin-right: 0;
  }

  &.active {
    filter: none;
  }
`;

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
  const { shootingCondition } = useSelector(selectors.cheki);
  const ready = shootingCondition === "complate";

  const handleOnClick = useCallback(() => {
    if (shootingCondition !== "complate") {
      return;
    }

    push(href);
  }, [shootingCondition]);

  return (
    <Image
      alt={alt}
      className={classnames({
        active: pathname === href,
        [fadeIn]: !always && ready,
        [fadeOut]: !always && !ready,
        [disabled]: !always && !ready,
      })}
      onClick={handleOnClick}
      src={src}
    />
  );
};

export const ChekiNavigation = () => (
  <Container>
    <NavigationIcon alt="カメラ" always href="/cheki" src="/camera.svg" />
    <NavigationIcon alt="フィルター" href="/cheki/filters" src="/filters.svg" />
    <NavigationIcon alt="フレーム" href="/cheki/frames" src="/frames.svg" />
    <NavigationIcon
      alt="保存・シェア"
      href="/cheki/save-and-share"
      src="/save-and-share.svg"
    />
  </Container>
);
