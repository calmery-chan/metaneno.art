import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { useIntersectionObserver } from "./hooks";
import { colors, media } from "./variables";

export default function MainContentLink() {
  const [targetRef, isIntersected] = useIntersectionObserver<HTMLDivElement>(
    {}
  );

  return (
    <Wrapper ref={targetRef}>
      <Bg isIntersected={isIntersected} />
      <Inner>
        <Message
          isIntersected={isIntersected}
          src="/lp/main-content-link/text.svg"
        />
        <ButtonWrapper>
          <div>
            <Ring isIntersected={isIntersected} src="/lp/decoration/ring.svg" />
            <Ring isIntersected={isIntersected} src="/lp/decoration/ring.svg" />
          </div>
          <div>
            <Triangle
              isIntersected={isIntersected}
              src="/lp/decoration/triangle.svg"
            />
            <Triangle
              isIntersected={isIntersected}
              src="/lp/decoration/triangle.svg"
            />
          </div>
          <Button
            src="/lp/main-content-link/coming-soon.svg"
            isIntersected={isIntersected}
          />
        </ButtonWrapper>
      </Inner>
    </Wrapper>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: relative;
  background-color: ${colors.yume};
  width: 100%;
`;

const overray = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Bg = styled.div<{ isIntersected: boolean }>`
  ${overray}

  &::before,
  &::after {
    content: "";
    display: block;
    ${overray}
  }
  &::before {
    background: url("/lp/main-illust-min.jpg") top 30% center / cover no-repeat;
    opacity: 0;

    ${media.smallDown} {
      background-position-x: 80%;
    }

    ${({ isIntersected }) =>
      isIntersected &&
      css`
        animation: ${fadeIn} 1.6s ease-out 0s forwards;
      `}
  }
  &::after {
    background: linear-gradient(
      to bottom,
      ${colors.yume},
      rgba(34, 57, 99, 0.3),
      ${colors.yume}
    );
  }
`;

const Inner = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  padding: 100px 0;
`;

const Message = styled.img<{ isIntersected: boolean }>`
  display: block;
  width: 950px;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${fadeIn} 0.6s ease-out 0.15s forwards;
    `}
`;

const popin = keyframes`
  from {
    opacity: 0;
  }
  50%,
  to {
    opacity: 1;
  }

  from {
    transform: translateY(18px);
  }
  50% {
    transform: translateY(-6px);
  }
  to {
    transform: translateY(0);
  }
`;

const ButtonWrapper = styled.div`
  position: relative;
`;

const Button = styled.img<{ isIntersected: boolean }>`
  position: relative;
  display: block;
  height: 180px;
  opacity: 0;

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${popin} 0.5s ease-out 0.3s forwards;
    `}
`;

const Ring = styled.img<{ isIntersected: boolean }>`
  display: block;
  position: absolute;
  width: 25px;
  opacity: 0;

  &:first-of-type {
    bottom: 36px;
    left: 36px;
  }
  &:last-of-type {
    top: 36px;
    right: 36px;
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${fadeIn} 0.6s ease-out 0.3s forwards;
    `}
`;

const Triangle = styled.img<{ isIntersected: boolean }>`
  display: block;
  position: absolute;
  width: 25px;
  opacity: 0;

  &:first-of-type {
    top: 36px;
    left: 36px;
  }
  &:last-of-type {
    bottom: 36px;
    right: 36px;
    transform: rotate(180deg);
  }

  ${({ isIntersected }) =>
    isIntersected &&
    css`
      animation: ${fadeIn} 0.6s ease-out 0.3s forwards;
    `}
`;
