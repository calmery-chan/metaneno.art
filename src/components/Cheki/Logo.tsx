import styled from "@emotion/styled";
import React from "react";

const Container = styled.div<{ size: number }>`
  img {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
  }
`;

export const ChekiLogo: React.FC<{ size: number }> = ({ size }) => (
  <Container size={size}>
    <img alt="ロゴ" src="/cheki/logo.svg" />
  </Container>
);
