import { styled } from "linaria/react";
import React from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChekiFlexColumn: React.FC = ({ children }) => (
  <Container>{children}</Container>
);
