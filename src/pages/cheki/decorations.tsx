import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { AddableDecorationListItem } from "../../components/Cheki/AddableDecorationListItem";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { ChekiModal } from "~/components/Cheki/Modal";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasChekiImage } from "~/containers/Cheki/CanvasChekiImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

const Container = styled.div`
  display: grid;
  gap: 4px;
  grid-template-columns: repeat(auto-fit, 96px);
  margin: 0 auto;
  max-width: 100%;
  width: fit-content;
`;

const items = css`
  height: 114px;
`;

const item = css`
  height: 114px;
  width: 114px;

  &:not(:last-child) {
    margin-right: ${Spacing.xs}px;
  }
`;

const openModal = css`
  ${Mixin.clickable};
  ${item};
`;

const removeButton = css`
  right: ${Spacing.xs}px;
  top: ${Spacing.xs}px;
`;

const Decorations: NextPage = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const addableDecorations = useSelector(selectors.addableDecorations);
  const addedDecorations = useSelector(selectors.addedDecorations);

  const handleOnClickAddDecoration = useCallback((decorationId: string) => {
    dispatch(actions.addDecoration({ decorationId }));
  }, []);

  const handleOnClickCloseModalButton = useCallback(() => setOpen(false), []);

  const handleOnClickItemRemoveButton = useCallback(
    (decorationId: string) =>
      dispatch(actions.removeDecoration({ decorationId })),
    []
  );

  const handleOnClickOpenModalButton = useCallback(() => setOpen(true), []);

  return (
    <>
      <ChekiApp>
        <ChekiFlexColumn>
          <ChekiHeader />
          <ChekiCanvas>
            <ChekiCanvasChekiImage />
          </ChekiCanvas>
          <ChekiColumn css={items}>
            <ChekiHorizontal>
              {addedDecorations.map((addedDecoration, key) => (
                <div className="relative" css={item} key={key}>
                  <img
                    className="h-full w-full"
                    src={addedDecoration.thumbnail}
                  />
                  <img
                    className="absolute cursor-pointer"
                    css={removeButton}
                    onClick={() =>
                      handleOnClickItemRemoveButton(addedDecoration.id)
                    }
                    src="/cheki/remove.svg"
                  />
                </div>
              ))}
              <div
                className="align-center cursor-pointer flex justify-center"
                css={openModal}
                onClick={handleOnClickOpenModalButton}
              >
                <img src="/cheki/decoration-add.svg" />
              </div>
            </ChekiHorizontal>
          </ChekiColumn>
          <ChekiNavigation />
        </ChekiFlexColumn>
      </ChekiApp>

      <ChekiModal
        onClickCloseButton={handleOnClickCloseModalButton}
        visible={isOpen}
      >
        <Container>
          {addableDecorations.map((decoration, key) => (
            <AddableDecorationListItem
              key={key}
              onClick={() => handleOnClickAddDecoration(decoration.id)}
              thumbnail={decoration.thumbnail}
            />
          ))}
        </Container>
      </ChekiModal>
    </>
  );
};

export default Decorations;
