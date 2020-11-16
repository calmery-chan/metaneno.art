import { styled } from "linaria/react";
import React from "react";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  box-sizing: content-box;
  display: flex;
  height: 32px;
  padding: ${Spacing.l}px;

  img {
    ${Mixin.clickable};

    height: 32px;
    margin-right: ${Spacing.l}px;
    filter: brightness(0);
    opacity: 0.37;
    cursor: pointer;

    &:last-child {
      margin-left: auto;
      margin-right: 0;
    }

    &.active {
      filter: none;
      opacity: 1;
    }
  }
`;

export const Controller: React.FC<{
  active: "camera" | "filters" | "frames" | "save";
}> = ({ active }) => (
  <Container>
    <img
      alt="カメラ"
      src="/camera.svg"
      className={active === "camera" ? "active" : ""}
    />
    <img
      alt="フィルター"
      src="/filters.svg"
      className={active === "filters" ? "active" : ""}
    />
    <img
      alt="フレーム"
      src="/frames.svg"
      className={active === "frames" ? "active" : ""}
    />
    <img
      alt="保存・シェア"
      src="/save-and-share.svg"
      className={active === "save" ? "active" : ""}
    />
  </Container>
);
