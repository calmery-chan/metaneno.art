import { css } from "@emotion/react";
import styled from "@emotion/styled";
import classnames from "classnames";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import { fadeIn, fadeOut, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

// Styles

const container = css`
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
  max-width: 38px;

  &.active {
    filter: none;
  }
` as any; // eslint-disable-line @typescript-eslint/no-explicit-any

const disabled = css`
  ${fadeOut};

  cursor: auto;
`;

// Components

const NavigationIcon: React.FC<{
  alt: string;
  href: string;
  src: string;
  always?: boolean;
}> = ({ alt, always = false, href, src }) => {
  const { pathname, push } = useRouter();
  const ready = useSelector(selectors.ready);

  // Events

  const handleOnClick = useCallback(() => {
    if (!ready) {
      return;
    }

    push(href);
  }, [ready]);

  // Render

  return (
    <IconContainer
      onClick={handleOnClick}
      css={!always && (ready ? fadeIn : disabled)}
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
  <div css={container}>
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
  </div>
);
