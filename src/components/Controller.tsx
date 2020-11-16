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
    opacity: 0.21;
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

export const Controller: React.FC = () => (
  <Container>
    <img alt="カメラ" src="/camera.svg" className="active" />
    <img alt="フィルター" src="/filters.svg" />
    <img alt="フレーム" src="/frames.svg" />
    <img alt="保存・シェア" src="/save-and-share.svg" />
  </Container>
);
