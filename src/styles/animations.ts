import { css, keyframes } from "@emotion/react";
import { Mixin } from "./mixin";

// Keyframes

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

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
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

export const bounceIn = css`
  animation: ${bounceInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

export const bounceOut = css`
  animation: ${bounceOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

export const fadeIn = css`
  animation: ${fadeInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

export const fadeOut = css`
  animation: ${fadeOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;
