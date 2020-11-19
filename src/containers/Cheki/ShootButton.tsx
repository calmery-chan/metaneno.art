import styled from "@emotion/styled";
import React from "react";
import { Mixin } from "~/styles/mixin";
const Container = styled.div`
  display: flex;
  height: max-content;
  justify-content: center;
`;

const Image = styled.img`
  ${Mixin.clickable};
  cursor: pointer;
`;

export const ChekiShootButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <Container>
    <Image alt="撮影する" onClick={onClick} src="/shoot.svg" />
  </Container>
);
