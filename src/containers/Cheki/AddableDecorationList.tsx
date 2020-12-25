import styled from "@emotion/styled";
import { createSelector } from "@reduxjs/toolkit";
import React, { useCallback } from "react";
import { AddableDecorationListItem } from "../../components/Cheki/AddableDecorationListItem";
import { CHEKI_DECORATIONS } from "~/constants/cheki";
import { useDispatch, useSelector, State } from "~/domains";
import { actions } from "~/domains/cheki";

const Container = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, 96px);
  margin: 0 auto;
  max-width: 100%;
  width: fit-content;
`;

const decorationsSelector = (state: State) => state.cheki.decorations;
const directionSelector = (state: State) => state.cheki.image.direction;

const addableDecorationSelector = createSelector(
  decorationsSelector,
  directionSelector,
  (decorations, direction) =>
    CHEKI_DECORATIONS.filter(
      (decoration) =>
        direction === decoration.direction &&
        !decorations.includes(decoration.id)
    )
);

export const AddableDecorationList: React.FC = () => {
  const dispatch = useDispatch();
  const addableDecorations = useSelector(addableDecorationSelector);

  const handleOnClickItem = useCallback((decorationId: string) => {
    dispatch(actions.addDecoration({ decorationId }));
  }, []);

  return (
    <Container>
      {addableDecorations.map((decoration, key) => (
        <AddableDecorationListItem
          key={key}
          onClick={() => handleOnClickItem(decoration.id)}
          thumbnail={decoration.thumbnail}
        />
      ))}
    </Container>
  );
};
