import { css, keyframes } from "@emotion/react";
import { Mixin } from "./mixin";

// Keyframes

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeInUpKeyframes = keyframes`
  from {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
  }

  to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  }
`;

const fadeOutDownKeyframes = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
`;

const fadeOutKeyframes = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

// Main

export const fadeIn = css`
  animation: ${fadeInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

export const fadeInUp = css`
  animation: ${fadeInUpKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

export const fadeOut = css`
  animation: ${fadeOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

export const fadeOutDown = css`
  animation: ${fadeOutDownKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;
