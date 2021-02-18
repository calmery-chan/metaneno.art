import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import React from "react";
import { media } from "./variables";

export default function ScrollIcon() {
  return <Wrapper></Wrapper>;
}

const slide = keyframes`
  from,
  to {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(250%);
  }
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: -108px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 55px;
  border-radius: 25px;
  border: solid 4px #223963;

  ${media.smallDown} {
    top: 40px;
    border-color: #fff;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 6px;
    left: 6px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #223963;
    animation: ${slide} 1.5s ease-in-out 0s infinite;

    ${media.smallDown} {
      background-color: #fff;
    }
  }
`;
