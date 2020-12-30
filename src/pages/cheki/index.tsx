import { css, Theme } from "@emotion/react";
import styled, { Interpolation } from "@emotion/styled";
import { NextPage } from "next";
import React, { useEffect, useState, useCallback } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { Icon } from "~/components/Cheki/Icon";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiLogo } from "~/components/Cheki/Logo";
import { ChekiModal } from "~/components/Cheki/Modal";
import { ChekiPopup } from "~/components/Cheki/Popup";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import {
  SPLASH_SCREEN_DURATION,
  NONEME_IMAGES,
  CharacterTag,
  CHARACTER_TAGS,
  CHEKI_FRAME_IMAGE_URLS,
} from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasTrimedImage } from "~/containers/Cheki/CanvasTrimedImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors, GradientColors } from "~/styles/colors";
import { fadeIn, fadeOut, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

// Styles

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

const move = css`
  cursor: move;
`;

const splashAnimation = css`
  ${Mixin.animation};
  ${fadeOut};
`;

const splashComment = css`
  ${Typography.XS};

  bottom: ${Spacing.l}px;
  color: ${Colors.black};
`;

const splashHeart = css`
  display: inline-block;
  vertical-align: middle;
`;

const Tag = styled.div<{ selected: boolean; disabled: boolean }>`
  ${Mixin.clickable};
  ${Typography.S};

  border: 1px solid ${Colors.gray};
  border-radius: 4px;
  color: ${Colors.black};
  cursor: pointer;
  font-weight: bold;
  margin-bottom: ${Spacing.s}px;
  margin-left: ${Spacing.s}px;
  padding: ${Spacing.m}px 0;
  text-align: center;
  width: 100px;

  ${({ selected }) =>
    selected &&
    css`
      background: ${GradientColors.pinkToOrange};
      border: 0;
      color: ${Colors.white};
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.48;
    `}
`;

// Components

export const ChekiCanvasTrim: React.FC<{ emotion?: Interpolation<Theme> }> = ({
  emotion,
}) => {
  const dispatch = useDispatch();
  const displayable = useSelector(selectors.displayable);
  const trim = useSelector(selectors.trim);

  // Events

  const handleOnComplete = useCallback(() => dispatch(actions.complete()), []);

  const handleOnStartDragging = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      dispatch(
        actions.startImageDragging({
          cursorPositions: convertEventToCursorPositions(event),
        })
      );
    },
    []
  );

  const handleOnTick = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(
        actions.tick({
          cursorPositions: convertEventToCursorPositions(event),
        })
      );
    },
    []
  );

  // Render

  return (
    <ChekiCanvas
      emotion={emotion}
      onMouseLeave={handleOnComplete}
      onMouseMove={handleOnTick}
      onMouseUp={handleOnComplete}
      onTouchEnd={handleOnComplete}
      onTouchMove={handleOnTick}
    >
      <ChekiCanvasTrimedImage visible />
      <rect fill="#000" fillOpacity="0.48" height="100%" width="100%" />
      <ChekiCanvasTrimedImage />

      <svg
        height={trim.height}
        viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
        width={trim.width}
        x={trim.x - displayable.x}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y={trim.y - displayable.y}
      >
        <rect
          fill="#fff"
          fillOpacity="0.48"
          height="100%"
          width={1 * trim.displayMagnification}
          x={trim.viewBoxWidth / 3}
          y="0"
        />

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height="100%"
          width={1 * trim.displayMagnification}
          x={(trim.viewBoxWidth / 3) * 2}
          y="0"
        />

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height={trim.displayMagnification}
          width="100%"
          x="0"
          y={trim.viewBoxHeight / 3}
        />

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height={trim.displayMagnification}
          width="100%"
          x="0"
          y={(trim.viewBoxHeight / 3) * 2}
        />

        {/* Border */}

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height={trim.displayMagnification}
          width="100%"
          x="0"
          y="0"
        />

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height={trim.displayMagnification}
          width="100%"
          x="0"
          y={trim.viewBoxHeight - trim.displayMagnification}
        />

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height="100%"
          width={trim.displayMagnification}
          x="0"
          y="0"
        />

        <rect
          fill="#fff"
          fillOpacity="0.48"
          height="100%"
          width={trim.displayMagnification}
          x={trim.viewBoxWidth - trim.displayMagnification}
          y="0"
        />

        {/* Top - Left */}

        <rect
          fill="#fff"
          height={2 * trim.displayMagnification}
          width={16 * trim.displayMagnification}
          x="0"
          y="0"
        />
        <rect
          fill="#fff"
          height={16 * trim.displayMagnification}
          width={2 * trim.displayMagnification}
          x="0"
          y="0"
        />

        {/* Top - Right */}

        <rect
          fill="#fff"
          height={2 * trim.displayMagnification}
          width={16 * trim.displayMagnification}
          x={trim.viewBoxWidth - 16 * trim.displayMagnification}
          y="0"
        />
        <rect
          fill="#fff"
          height={16 * trim.displayMagnification}
          width={2 * trim.displayMagnification}
          x={trim.viewBoxWidth - 2 * trim.displayMagnification}
          y="0"
        />

        {/* Bottom - Left */}

        <rect
          fill="#fff"
          height={2 * trim.displayMagnification}
          width={16 * trim.displayMagnification}
          x="0"
          y={trim.viewBoxHeight - 2 * trim.displayMagnification}
        />
        <rect
          fill="#fff"
          height={16 * trim.displayMagnification}
          width={2 * trim.displayMagnification}
          x="0"
          y={trim.viewBoxHeight - 16 * trim.displayMagnification}
        />

        {/* Bottom - Right */}

        <rect
          fill="#fff"
          height={2 * trim.displayMagnification}
          width={16 * trim.displayMagnification}
          x={trim.viewBoxWidth - 16 * trim.displayMagnification}
          y={trim.viewBoxHeight - 2 * trim.displayMagnification}
        />
        <rect
          fill="#fff"
          height={16 * trim.displayMagnification}
          width={2 * trim.displayMagnification}
          x={trim.viewBoxWidth - 2 * trim.displayMagnification}
          y={trim.viewBoxHeight - 16 * trim.displayMagnification}
        />
      </svg>

      <rect
        css={move}
        fillOpacity="0"
        height={trim.height}
        onMouseDown={handleOnStartDragging}
        onTouchStart={handleOnStartDragging}
        width={trim.width}
        x={trim.x - displayable.x}
        y={trim.y - displayable.y}
      />
    </ChekiCanvas>
  );
};

export const ChekiCamera: React.FC = () => {
  const dispatch = useDispatch();
  const dataUrl = useSelector(selectors.imageDataUrl);
  const ready = useSelector(selectors.ready);
  const characterTags = useSelector(selectors.characterTags);
  const selectableCharacterTags = useSelector(
    selectors.selectableCharacterTags
  );

  // States

  const [flashAnimation, setFlashAnimation] = useState(false);
  const [renewConfirm, setRenewConfirm] = useState(false);
  const [showTags, setShowTags] = useState(false);

  // Events

  const handleOnCancelRenew = useCallback(() => setRenewConfirm(false), []);

  const handleOnClickCharacterTag = useCallback(
    (tag: CharacterTag) => dispatch(actions.changeCharacterTags({ tag })),
    []
  );

  const handleOnClickShowTagsButton = useCallback(() => setShowTags(true), []);

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
    dispatch(actions.take({ characterTags }));

    setTimeout(() => {
      dispatch(actions.ready({ ready: true }));
    }, Mixin.ANIMATION_DURATION.milliseconds / 2);
  }, [characterTags]);

  const handleOnEnterRenew = useCallback(() => {
    setRenewConfirm(false);
    dispatch(actions.removeImage());
  }, []);

  const handleOnLoadImage = useCallback(
    (url: string) => dispatch(actions.addImage({ url })),
    []
  );

  // Side Effects

  // 画像を先に読み込んでキャッシュさせる
  useEffect(() => {
    [...NONEME_IMAGES, ...CHEKI_FRAME_IMAGE_URLS].map(
      ({ url }) => (new Image().src = url)
    );
  }, []);

  // Render

  // 画像の読み込み、画像の切り取りが完了している
  if (ready) {
    return (
      <>
        <ChekiCanvas emotion={animationFadeIn}>
          <ChekiCanvasTrimedImage />
        </ChekiCanvas>

        <ChekiColumn css={animationFadeIn} margin>
          <ChekiSubButton onClick={handleOnClickShootAgainButton}>
            もう一度撮影する
          </ChekiSubButton>
        </ChekiColumn>
      </>
    );
  }

  // 画像の読み込み、画像の切り取りが完了していない
  if (!dataUrl) {
    return <ChekiInputImage onLoad={handleOnLoadImage} />;
  }

  // 画像の読み込みは完了しているが、画像の切り取りが完了していない
  return (
    <>
      <ChekiCanvasTrim emotion={flashAnimation && animationFadeOut} />
      <ChekiColumn
        css={flashAnimation && animationFadeOut}
        className="flex justify-between"
        margin
        style={{ height: "max-content" }}
      >
        <div
          className="flex items-center"
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
        <div>
          <Icon
            alt="撮影する"
            onClick={handleOnClickShootButton}
            src="/cheki/shoot.svg"
          />
        </div>
        <div
          className="flex items-center"
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
            onClick={handleOnClickShowTagsButton}
            src="/cheki/filter.svg"
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

      <ChekiModal
        visible={showTags}
        onClickCloseButton={() => {
          setShowTags(false);
        }}
      >
        <div className="flex">
          {CHARACTER_TAGS.map(({ name, id }, key) => {
            const selected = characterTags.includes(id);
            const disabled = !selected && !selectableCharacterTags.includes(id);

            return (
              <Tag
                key={key}
                onClick={
                  !disabled ? () => handleOnClickCharacterTag(id) : undefined
                }
                selected={selected}
                disabled={disabled}
              >
                {name}
              </Tag>
            );
          })}
        </div>
      </ChekiModal>
    </>
  );
};

export const Index: NextPage = () => {
  const dispatch = useDispatch();
  const splashed = useSelector(selectors.splashed);

  const [fire, setFire] = useState(false);

  // Side Effects

  useEffect(() => {
    setTimeout(() => setFire(true), SPLASH_SCREEN_DURATION);
  }, []);

  useEffect(() => {
    if (fire) {
      setTimeout(
        () => dispatch(actions.splashed()),
        Mixin.ANIMATION_DURATION.milliseconds
      );
    }
  }, [fire]);

  // Render

  return (
    <>
      <ChekiApp
        seoProps={{
          nofollow: false,
          noindex: false,
        }}
      >
        <ChekiFlexColumn>
          <ChekiHeader />
          <ChekiCamera />
          <ChekiNavigation />
        </ChekiFlexColumn>
      </ChekiApp>

      {!splashed && (
        <div css={fire ? splashAnimation : undefined}>
          <div className="bg-white bottom-0 fixed flex h-full items-center justify-center left-0 right-0 top-0 w-full">
            <ChekiLogo size={256} />
            <div className="absolute font-bold" css={splashComment}>
              Made with <img css={splashHeart} src="/cheki/heart.svg" /> by
              めたねのおくすり
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
