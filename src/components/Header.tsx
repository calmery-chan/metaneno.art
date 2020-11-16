import { styled } from "linaria/lib/react";
import React from "react";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  box-sizing: content-box;
  display: flex;
  height: 24px;
  padding: ${Spacing.l}px;
  padding-bottom: ${Spacing.m}px;

  img {
    ${Mixin.clickable};

    cursor: pointer;
    height: 24px;

    &:last-child {
      margin-left: auto;
    }
  }
`;

export const Header: React.FC = () => (
  <Container>
    <img alt="閉じる" src="/close.svg" />
    <img alt="インフォメーション" src="/information.svg" />
  </Container>
);
