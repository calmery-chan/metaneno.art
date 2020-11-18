import { css } from "linaria";

const ANIMATION_DURATION = {
  seconds: 0.4,
  milliseconds: 400,
};

const animation = `
  transition: ease ${ANIMATION_DURATION.seconds}s;
  animation-fill-mode: forwards;
  animation-duration: ${ANIMATION_DURATION.seconds}s;
`;

const clickable = `
  cursor: pointer;
  transition: ${ANIMATION_DURATION.seconds}s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

export const fadeIn = css`
  animation-name: fadeIn;
  -webkit-animation-name: fadeIn;
`;

export const fadeOut = css`
  animation-name: fadeOut;
  -webkit-animation-name: fadeOut;
`;

export const fadeInUp = css`
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
`;

export const fadeOutDown = css`
  animation-name: fadeOutDown;
  -webkit-animation-name: fadeOutDown;
`;

export const bounceIn = css`
  animation-name: bounceIn;
  -webkit-animation-name: bounceIn;
`;

export const bounceOut = css`
  animation-name: bounceOut;
  -webkit-animation-name: bounceOut;
`;

export const Mixin = { ANIMATION_DURATION, animation, clickable };
