import styled from "@emotion/styled";
import React from "react";
import { Image } from "~/components/Image";

const Container = styled.div<{ size: number }>`
  img {
    height: ${({ size }) => size}px;
    width: ${({ size }) => size}px;
  }
`;

export const ChekiLogo: React.FC<{ size: number }> = ({ size }) => (
  <Container size={size}>
    <Image src="/cheki/logo.png" webp />
  </Container>
);
