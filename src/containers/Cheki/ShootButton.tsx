import styled from "@emotion/styled";
import React from "react";
import { Icon } from "~/components/Cheki/Icon";

const Container = styled.div`
  display: flex;
  height: max-content;
  justify-content: center;
`;

export const ChekiShootButton: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <Container>
    <Icon alt="撮影する" onClick={onClick} src="/cheki/shoot.svg" />
  </Container>
);
