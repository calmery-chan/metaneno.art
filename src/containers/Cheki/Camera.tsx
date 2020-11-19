import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { ChekiCanvas } from "./Canvas";
import { ChekiCanvasContainer } from "./CanvasContainer";
import { ChekiCanvasTrim } from "./CanvasTrim";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiPopup } from "~/components/Cheki/Popup";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { ChekiShootButton } from "~/containers/Cheki/ShootButton";
import { ChekiTrim } from "~/containers/Cheki/Trim";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { Spacing } from "~/styles/spacing";

export const ChekiCamera: React.FC = () => {
  const dispatch = useDispatch();
  const { image, ready } = useSelector(selectors.cheki);

  // States

  const [renewConfirm, setRenewConfirm] = useState(false);

  // Events

  const handleOnCancelRenew = useCallback(() => setRenewConfirm(false), []);

  const handleOnClickRenewConfirmButton = useCallback(
    () => setRenewConfirm(true),
    []
  );

  const handleOnClickShootAgainButton = useCallback(
    () => dispatch(actions.ready({ ready: false })),
    []
  );

  const handleOnClickShootButton = useCallback(
    () => dispatch(actions.ready({ ready: true })),
    []
  );

  const handleOnEnterRenew = useCallback(() => {
    setRenewConfirm(false);
    dispatch(actions.removeImage());
  }, []);

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
      {!image.dataUrl && <ChekiInputImage onLoad={handleOnLoadImage} />}
      {image.dataUrl && (
        <>
          <ChekiTrim />
          <ChekiColumn className="relative" margin>
            <ChekiShootButton onClick={handleOnClickShootButton} />
            <div
              className="absolute flex items-center"
              css={css`
                height: 100%;
                top: 0;
                left: ${Spacing.l}px;
              `}
            >
              <img
                css={css`
                  height: 32px;
                  width: 32px;
                `}
                onClick={handleOnClickRenewConfirmButton}
                src="/cheki/image.svg"
              />
            </div>
          </ChekiColumn>

          {renewConfirm && (
            <ChekiPopup
              cancalText="いいえ"
              enterText="はい"
              onCancel={handleOnCancelRenew}
              onEnter={handleOnEnterRenew}
            >
              画像を読み込み直しますか？
              <br />
              編集中の内容は全て失われます！
            </ChekiPopup>
          )}
        </>
      )}
    </>
  );
};
