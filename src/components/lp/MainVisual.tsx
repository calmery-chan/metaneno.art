import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import Section from "./Section";
import { media } from "./variables";

export default function MainVisual() {
  return (
    <>
      <Wrapper>
        <Image />
        <Logo src="/lp/logo.svg" />
      </Wrapper>
      <div>
        <Section />
      </div>
    </>
  );
}

const Wrapper = styled.div`
  position: relative;
`;

const scaleIn = keyframes`
  from {
    transform: scale(1.09);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const Image = styled.div`
  position: relative;
  width: 100%;

  &::before,
  &::after {
    content: "";
    display: block;
  }
  &::before {
    padding-top: 56.16%;

    ${media.smallDown} {
      padding-top: 60.83%;
    }
  }
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(/lp/main-illust-min.jpg) center / cover no-repeat;
    opacity: 0;
    animation: ${scaleIn} 2s cubic-bezier(0, 0, 0.19, 1.01) 0s both;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Logo = styled.img`
  position: absolute;
  bottom: 10%;
  left: 10%;
  width: 42%;
  opacity: 0;
  animation: ${fadeIn} 2s cubic-bezier(0, 0, 0.19, 1.01) 0.8s both;

  ${media.smallDown} {
    bottom: 13%;
    left: 4%;
    width: 54%;
  }
`;
