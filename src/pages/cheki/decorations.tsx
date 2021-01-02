import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { Icon } from "~/components/Cheki/Icon";
import { ChekiModal } from "~/components/Cheki/Modal";
import { EDITING_SCENARIO } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasChekiImage } from "~/containers/Cheki/CanvasChekiImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { getScenarioCacheId } from "~/utils/cheki";

const Decoration = styled.div<{ selected: boolean }>`
  ${Mixin.clickable};

  height: 96px;
  width: 96px;

  ${({ selected }) =>
    selected &&
    css`
      opacity: 0.48;
    `}
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

const modal = css`
  display: grid;
  gap: ${Spacing.s}px;
  grid-template-columns: repeat(auto-fit, 96px);
  margin: 0 auto;
  max-width: 100%;
  width: max-content;
`;

const openModal = css`
  ${Mixin.clickable};
  ${item};
`;

const removeButton = css`
  right: ${Spacing.xs}px;
  top: ${Spacing.xs}px;
`;

const thumbnail = css`
  height: 100%;
  object-fit: contain;
  user-select: none;
  width: 100%;
`;

const Decorations: NextPage = () => {
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();
  const addedDecorations = useSelector(selectors.addedDecorations);
  const addedDecorationIds = useSelector(selectors.addedDecorationIds);
  const availableDecorations = useSelector(selectors.availableDecorations);

  const handleOnClickAddDecoration = useCallback(
    (decorationId: string) => dispatch(actions.addDecoration({ decorationId })),
    []
  );

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
          <ChekiHeader
            forceDisplayOnlyOnce={getScenarioCacheId("editing")}
            scenario={EDITING_SCENARIO}
          />
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
                  <Icon
                    className="absolute cursor-pointer"
                    css={removeButton}
                    onClick={() =>
                      handleOnClickItemRemoveButton(addedDecoration.id)
                    }
                    src="/cheki/decorations/remove.svg"
                  />
                </div>
              ))}
              <div
                className="cursor-pointer flex items-center justify-center"
                css={openModal}
                onClick={handleOnClickOpenModalButton}
              >
                <Icon src="/cheki/decorations/add.svg" />
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
        <div css={modal}>
          {availableDecorations.map((decoration, key) => {
            const selected = addedDecorationIds.includes(decoration.id);

            return (
              <Decoration
                key={key}
                onClick={
                  !selected
                    ? () => handleOnClickAddDecoration(decoration.id)
                    : undefined
                }
                selected={selected}
              >
                <img
                  css={thumbnail}
                  src={decoration.thumbnail}
                  alt="デコレーション素材"
                />
              </Decoration>
            );
          })}
        </div>
      </ChekiModal>
    </>
  );
};

export default Decorations;
