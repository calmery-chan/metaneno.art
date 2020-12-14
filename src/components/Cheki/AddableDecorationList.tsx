import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { AddableDecorationListItem } from "./AddableDecorationListItem";

const Container = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, 96px);
  margin: 0 auto;
  max-width: 100%;
  width: fit-content;
`;

export const AddableDecorationList: React.FC = () => {
  const handleOnClickItem = useCallback(() => {
    console.log("Click !");
  }, []);

  return (
    <Container>
      <AddableDecorationListItem onClick={() => handleOnClickItem()} />
    </Container>
  );
};
