import { css, keyframes } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { Scene } from "three";
import { Exhibition3dCamera } from "./Camera";
import { Exhibition3dCanvas } from "./Canvas";
import { Exhibition3dLights } from "./Lights";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { getScene } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";

// Animations

const bounceInKeyframes = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;

const bounceIn = css`
  animation: ${bounceInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

const bounceOutKeyframes = keyframes`
  20% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  50%, 55% {
    opacity: 1;
    transform: scale3d(1.1, 1.1, 1.1);
  }

  to {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
`;

const bounceOut = css`
  animation: ${bounceOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeIn = css`
  animation: ${fadeInKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

const fadeOutKeyframes = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const fadeOut = css`
  animation: ${fadeOutKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

// Styles

const background = css`
  background: ${Colors.blackTransparent};
`;

const body = css`
  background: ${Colors.white};
  height: 100%;
  max-height: 768px;
  max-width: 1024px;
  padding: ${Spacing.m}px;
  width: 100%;
`;

const close = css`
  ${Mixin.clickable};
  height: 24px;
  width: 24px;
`;

const container = css`
  padding: ${Spacing.m}px;
`;

const contents = css`
  grid-template-columns: 1fr 1fr;
  gap: ${Spacing.s}px;
  margin-top: ${Spacing.s}px;
`;

const description = css`
  ${Typography.S};
`;

const title = css`
  ${Typography.L};
`;

const toggle = css`
  background: #000;
  height: 24px;
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;
  width: 24px;
`;

const view = css`
  background: ${Colors.lightGray};
  height: 100%;
`;

// Main

export const Exhibition3dWork = React.memo<{ onClose: () => void }>(
  ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [scene, setScene] = useState<Scene>();
    const [mode, setMode] = useState<"2d" | "3d">("2d");

    // Events

    const handleClickCloseButton = useCallback(() => {
      setIsVisible(false);

      setTimeout(() => {
        onClose();
      }, Mixin.ANIMATION_DURATION.seconds);
    }, [onClose]);

    const handleClickToggleMode = useCallback(() => {
      setMode(mode === "2d" ? "3d" : "2d");
    }, [mode]);

    // Side Effects

    useEffect(() => {
      (async () => {
        try {
          setScene(
            await getScene(
              "http://localhost:8000/objects/areas/cloud/koishi.glb"
            )
          );
        } catch (error) {
          Sentry.captureException(error);
        }
      })();
    }, []);

    // Render

    return (
      <>
        <div
          className="fixed h-full w-full"
          css={css`
            ${background};
            ${isVisible ? fadeIn : fadeOut}
          `}
        />
        <div
          className="fixed grid h-full place-items-center w-full"
          css={css`
            ${container};
            ${isVisible ? bounceIn : bounceOut}
          `}
        >
          <div className="flex flex-col" css={body}>
            <div className="flex items-center">
              <div css={title}>Title</div>
              <div
                className="ml-auto"
                css={close}
                onClick={handleClickCloseButton}
              >
                <img src="/exhibition/close.svg" />
              </div>
            </div>
            <div className="grid flex-grow" css={contents}>
              <div className="relative" css={view}>
                {mode === "2d" && (
                  <img
                    className="h-full object-contain w-full"
                    src="/exhibition/q8lOo072QPZKELTtdVekq6wY.jpg"
                  />
                )}
                {mode === "3d" && (
                  <Exhibition3dCanvas>
                    <Exhibition3dCamera />
                    <Exhibition3dLights />
                    <primitive object={scene} />
                  </Exhibition3dCanvas>
                )}
                {scene && (
                  <div
                    className="absolute"
                    css={toggle}
                    onClick={handleClickToggleMode}
                  >
                    {mode === "2d" && <div>3d</div>}
                    {mode === "3d" && <div>2d</div>}
                  </div>
                )}
              </div>
              <div css={description}>Description</div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
