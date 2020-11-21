import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { ChekiCanvas } from "./Canvas";
import { ChekiCanvasContainer } from "./CanvasContainer";
import { ChekiCanvasTrim } from "./CanvasTrim";
import { ChekiColumn } from "~/components/Cheki/Column";
import { Icon } from "~/components/Cheki/Icon";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiPopup } from "~/components/Cheki/Popup";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { ChekiShootButton } from "~/containers/Cheki/ShootButton";
import { ChekiTrim } from "~/containers/Cheki/Trim";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { fadeIn, fadeOut, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import * as GA from "~/utils/cheki/google-analytics";

const animationFadeIn = css`
  animation-fill-mode: forwards;
  animation-duration: ${Mixin.ANIMATION_DURATION.seconds / 2}s;

  ${fadeIn};
`;

const animationFadeOut = css`
  animation-fill-mode: forwards;
  animation-duration: ${Mixin.ANIMATION_DURATION.seconds / 2}s;

  ${fadeOut};
`;

export const ChekiCamera: React.FC = () => {
  const dispatch = useDispatch();
  const { image, ready } = useSelector(selectors.cheki);
  const [flashAnimation, setFlashAnimation] = useState(false);

  // States

  const [renewConfirm, setRenewConfirm] = useState(false);

  // Events

  const handleOnCancelRenew = useCallback(() => setRenewConfirm(false), []);

  const handleOnClickRenewConfirmButton = useCallback(
    () => setRenewConfirm(true),
    []
  );

  const handleOnClickShootAgainButton = useCallback(() => {
    setFlashAnimation(false);

    GA.takeAPhotoAgain();

    dispatch(actions.ready({ ready: false }));
  }, []);

  const handleOnClickShootButton = useCallback(() => {
    setFlashAnimation(true);
    dispatch(actions.take());

    setTimeout(() => {
      dispatch(actions.ready({ ready: true }));
    }, Mixin.ANIMATION_DURATION.milliseconds / 2);
  }, []);

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
        <ChekiCanvasContainer emotion={animationFadeIn}>
          <ChekiCanvas>
            <ChekiCanvasTrim hidden />
          </ChekiCanvas>
        </ChekiCanvasContainer>
        <ChekiColumn css={animationFadeIn} margin>
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
          <ChekiTrim emotion={flashAnimation && animationFadeOut} />
          <ChekiColumn
            css={flashAnimation && animationFadeOut}
            className="relative"
            margin
          >
            <ChekiShootButton onClick={handleOnClickShootButton} />
            <div
              className="absolute flex items-center"
              css={css`
                height: 100%;
                top: 0;
                left: ${Spacing.l}px;
              `}
            >
              <Icon
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
