import { css, keyframes } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
// Animations

const bounceInKeyframes = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const bounceIn = css`
  animation: ${bounceInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

const bounceOutKeyframes = keyframes`
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%, 55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
`;

const bounceOut = css`
  animation: ${bounceOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeIn = css`
  animation: ${fadeInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

const fadeOutKeyframes = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeOut = css`
  animation: ${fadeOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

// Styles

const background = css`
  background: ${Colors.blackTransparent};
`;

const body = css`
  background: ${Colors.white};
  height: 100%;
  max-height: 768px;
  max-width: 1024px;
  padding: ${Spacing.m}px;
  width: 100%;
`;

const close = css`
  ${Mixin.clickable};
  height: 24px;
  width: 24px;
`;

const container = css`
  padding: ${Spacing.m}px;
`;

const contents = css`
  margin-top: ${Spacing.s}px;
`;

const title = css`
  ${Typography.L};
`;

// Main

export const ExhibitionPopup = React.memo<{
  children: React.ReactNode;
  onClose: () => void;
}>(({ children, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Events

  const handleClickCloseButton = useCallback(() => {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, Mixin.ANIMATION_DURATION.seconds);
  }, [onClose]);

  // Render

  return (
    <>
      <div
        className="fixed h-full w-full"
        css={css`
          ${background};
          ${isVisible ? fadeIn : fadeOut}
        `}
      />
      <div
        className="fixed grid h-full place-items-center w-full"
        css={css`
          ${container};
          ${isVisible ? bounceIn : bounceOut}
        `}
      >
        <div className="flex flex-col" css={body}>
          <div className="flex items-center">
            <div css={title}>Title</div>
            <div
              className="ml-auto"
              css={close}
              onClick={handleClickCloseButton}
            >
              <img src="/exhibition/close.svg" />
            </div>
          </div>
          <div className="flex-grow" css={contents}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
});
