import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "./hooks";
import { media } from "./variables";

export default function Badge() {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLDivElement>(
    {}
  );

  return (
    <Wrapper ref={targetRef} isIntersected={isIntersected}>
      <Bg src="/lp/story/badge-bg.svg" isIntersected={isIntersected} />
      <Text src="/lp/story/badge-text.svg" />
    </Wrapper>
  );
}

const popin = keyframes`
  from {
    opacity: 0;
  }
  50%,
  to {
    opacity: 1;
  }

  from {
    transform: scale(0.75);
  }
  50% {
    transform: scale(1.05);
  }
  to {
    transform: scale(1);
  }
`;

const Wrapper = styled.div<{ isIntersected: boolean }>`
  position: absolute;
  opacity: 0;

  ${media.mediumUp} {
    top: -150px;
    right: 40px;
    width: 250px;
  }

  ${media.smallDown} {
    top: 20px;
    width: 128px;
  }

  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${popin} 0.5s ease-out 0s forwards;
    `}
`;

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
`;

const Bg = styled.img<{ isIntersected: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${rotate} 16s linear 0s infinite;
    `}
`;

const Text = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
`;
