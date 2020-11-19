import React, { useCallback } from "react";
import { ChekiCanvas } from "./Canvas";
import { ChekiCanvasContainer } from "./CanvasContainer";
import { ChekiCanvasTrim } from "./CanvasTrim";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { ChekiShootButton } from "~/containers/Cheki/ShootButton";
import { ChekiTrim } from "~/containers/Cheki/Trim";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";

export const ChekiCamera: React.FC = () => {
  const dispatch = useDispatch();
  const { image, ready } = useSelector(selectors.cheki);

  // Events

  const handleOnClickShootAgainButton = useCallback(
    () => dispatch(actions.ready({ ready: false })),
    []
  );

  const handleOnClickShootButton = useCallback(
    () => dispatch(actions.ready({ ready: true })),
    []
  );

  const handleOnLoadImage = useCallback(
    (url: string) => dispatch(actions.addImage({ url })),
    []
  );

  // Render

  if (ready) {
    return (
      <>
        <ChekiCanvasContainer>
          <ChekiCanvas>
            <ChekiCanvasTrim hidden />
          </ChekiCanvas>
        </ChekiCanvasContainer>
        <ChekiColumn margin>
          <ChekiSubButton onClick={handleOnClickShootAgainButton}>
            もう一度撮影する
          </ChekiSubButton>
        </ChekiColumn>
      </>
    );
  }

  return (
    <>
      {!image.url && <ChekiInputImage onLoad={handleOnLoadImage} />}
      {image.url && (
        <>
          <ChekiTrim />
          <ChekiColumn margin>
            <ChekiShootButton onClick={handleOnClickShootButton} />
          </ChekiColumn>
        </>
      )}
    </>
  );
};
