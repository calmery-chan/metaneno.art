import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { AddableDecorationListItem } from "../../components/Cheki/AddableDecorationListItem";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiModal } from "~/components/Cheki/Modal";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasChekiImage } from "~/containers/Cheki/CanvasChekiImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";

const Container = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, 96px);
  margin: 0 auto;
  max-width: 100%;
  width: fit-content;
`;

const Decorations: NextPage = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const addableDecorations = useSelector(selectors.addableDecorations);

  const handleOnClickItem = useCallback((decorationId: string) => {
    dispatch(actions.addDecoration({ decorationId }));
  }, []);

  return (
    <>
      <ChekiApp>
        <ChekiFlexColumn>
          <ChekiHeader />
          <ChekiCanvas>
            <ChekiCanvasChekiImage />
          </ChekiCanvas>
          <ChekiColumn>
            <button onClick={() => setOpen(true)}>Open</button>
          </ChekiColumn>
          <ChekiNavigation />
        </ChekiFlexColumn>
      </ChekiApp>

      <ChekiModal onClickCloseButton={() => setOpen(false)} visible={isOpen}>
        <Container>
          {addableDecorations.map((decoration, key) => (
            <AddableDecorationListItem
              key={key}
              onClick={() => handleOnClickItem(decoration.id)}
              thumbnail={decoration.thumbnail}
            />
          ))}
        </Container>
      </ChekiModal>
    </>
  );
};

export default Decorations;
