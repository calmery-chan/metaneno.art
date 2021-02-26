import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { media } from "./variables";

export default function LoadingIcon() {
  return (
    <Wrapper>
      <Inner>
        <Svg viewBox="0 0 800 800">
          <IceWrapper>
            <Layer1 xlinkHref="/lp/loading/7.png" />
            <Layer2 xlinkHref="/lp/loading/6.png" />
          </IceWrapper>
          <Layer3 xlinkHref="/lp/loading/5.png" />
          <Layer3Sub xlinkHref="/lp/loading/5-change.png" />
          <Layer4 xlinkHref="/lp/loading/4.png" />
          <Layer5 xlinkHref="/lp/loading/3.png" />
          <Layer6Wrapper>
            <Layer6 xlinkHref="/lp/loading/2.png" />
          </Layer6Wrapper>
          <Layer7 xlinkHref="/lp/loading/1.png" />
        </Svg>
      </Inner>
    </Wrapper>
  );
}

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const slideOver = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 1;
  animation: ${fadeOut} 0.5s ease-out 2.7s both,
    ${slideOver} 0.05s ease-out 3.2s forwards;
`;

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -64%);
`;

const Svg = styled.svg`
  width: 350px;
  overflow: visible;
  animation: ${fadeOut} 0.3s ease-out 2.4s both;

  ${media.smallDown} {
    width: 180px;
  }
`;

const layerStyles = css`
  width: 800px;
  height: 800px;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fallIce = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(25px);
  }
`;

const IceWrapper = styled.g`
  animation: ${fallIce} 2.4s linear 0s both;
`;

const Layer1 = styled.image`
  ${layerStyles}
`;

const fallCherry = keyframes`
  from {
    transform: translateY(0) rotate(0);
  }
  to {
    transform: translateY(20px) rotate(20deg);
  }
`;

const Layer2 = styled.image`
  ${layerStyles}
  transform-origin: 410px 190px;
  animation: ${fallCherry} 2.4s linear 0s both;
`;

const Layer3 = styled.image`
  ${layerStyles}
`;

const Layer3Sub = styled.image`
  ${layerStyles}
  animation: ${fadeIn} 2.4s linear 0s both;
`;

const Layer4 = styled.image`
  ${layerStyles}
  animation: ${fadeIn} 2.4s linear 0s both;
`;

const Layer5 = styled.image`
  ${layerStyles}
`;

const mixX = keyframes`
  from,
  to {
    transform: translateX(0);
  }
  50% {
    transform: translateX(120px);
  }
`;

const mixY = keyframes`
  from,
  to {
    transform: translateY(-20px);
  }
  30% {
    transform: translateY(10px);
  }
  70% {
    transform: translateY(-50px);
  }
`;

const Layer6Wrapper = styled.g`
  animation: ${mixY} 1.2s ease-in-out 0s infinite;
`;

const Layer6 = styled.image`
  ${layerStyles}
  animation: ${mixX} 1.2s ease-in-out 0s infinite;
`;

const Layer7 = styled.image`
  ${layerStyles}
`;
