import { styled } from "linaria/react";
import React from "react";

const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Children = styled.div`
  width: fit-content;
  display: flex;
`;

export const Horizontal: React.FC = ({ children }) => (
  <Container>
    <Children>{children}</Children>
  </Container>
);
