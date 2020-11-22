import styled from "@emotion/styled";
import React from "react";
import MainContentLink from "./MainContentLink";
import { colors, media } from "./variables";

export default function Footer() {
  return (
    <Wrapper>
      <MainContentLink />
      <Bar>
        <Copyright src="/lp/copyright.svg" />
      </Bar>
      <ScrollTop
        onClick={() => {
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        }}
        src="/lp/scroll-top.svg"
      />
    </Wrapper>
  );
}

const ScrollTop = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  width: 200px;
  height: 200px;
  transform: translate(-50%, -60%);
  cursor: pointer;

  ${media.smallDown} {
    width: 140px;
    height: 140px;
  }
`;

const Wrapper = styled.div`
  position: relative;
  background-color: ${colors.yume};

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 36px;
    background: url(/lp/decoration/wave-yume.png) center / auto 100% repeat-x;
    transform: translateY(-100%);

    ${media.smallDown} {
      height: 24px;
    }
  }
`;

const Bar = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  height: 96px;
`;

const Copyright = styled.img`
  display: block;
  height: 16px;

  ${media.smallDown} {
    height: 12px;
  }
`;
