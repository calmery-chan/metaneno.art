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

export const Horizontal: React.FC<{ padding?: number }> = ({
  children,
  padding,
}) => (
  <Container>
    <Children
      style={{
        padding: `0 ${padding}px`,
      }}
    >
      {children}
    </Children>
  </Container>
);
