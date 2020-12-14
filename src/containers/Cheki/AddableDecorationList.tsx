import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { AddableDecorationListItem } from "../../components/Cheki/AddableDecorationListItem";
import { CHEKI_DECORATIONS } from "~/constants/cheki";
import { useDispatch, useSelector, selectors } from "~/domains";
import { actions } from "~/domains/cheki";

const Container = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, 96px);
  margin: 0 auto;
  max-width: 100%;
  width: fit-content;
`;

export const AddableDecorationList: React.FC = () => {
  const {
    decorations,
    image: { direction },
  } = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  const handleOnClickItem = useCallback((decorationId: string) => {
    dispatch(actions.addDecoration({ decorationId }));
  }, []);

  return (
    <Container>
      {CHEKI_DECORATIONS.filter(
        (decoration) =>
          direction === decoration.direction &&
          !decorations.includes(decoration.id)
      ).map((decoration, key) => (
        <AddableDecorationListItem
          key={key}
          onClick={() => handleOnClickItem(decoration.id)}
          thumbnail={decoration.thumbnail}
        />
      ))}
    </Container>
  );
};
