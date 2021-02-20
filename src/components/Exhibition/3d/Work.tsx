import { css } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { Scene, Vector3 } from "three";
import { Exhibition3dCamera } from "./Camera";
import { Exhibition3dCanvas } from "./Canvas";
import { Exhibition3dRenderer } from "./Renderer";
import { bounceIn, bounceOut, fadeIn, fadeOut } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { getGltf } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";

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

const border = css`
  margin: ${Spacing.m}px 0;
`;

const character = css`
  background: ${Colors.lightGray};
  border-radius: 2px;
  margin-right: ${Spacing.xs}px;
  padding: ${Spacing.xs}px ${Spacing.s}px;
`;

const close = css`
  ${Mixin.clickable};
  height: 24px;
  width: 24px;
`;

const column = css`
  ${Typography.S};
  border-bottom: 1px solid ${Colors.lightGray};
  padding: ${Spacing.m}px 0;

  &:last-child {
    border: none;
  }
`;

const commentTitle = css`
  ${Typography.M};
  font-weight: bold;
  margin-bottom: ${Spacing.xs}px;
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
  padding: ${Spacing.m}px 0;
`;

const title = css`
  ${Typography.M};
  font-weight: bold;
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
      }, Mixin.ANIMATION_DURATION.milliseconds);
    }, [onClose]);

    const handleClickToggleMode = useCallback(() => {
      setMode(mode === "2d" ? "3d" : "2d");
    }, [mode]);

    // Side Effects

    useEffect(() => {
      (async () => {
        try {
          const { scene } = await getGltf("/aquarium.glb");
          setScene(scene);
        } catch (error) {
          Sentry.captureException(error);
        }
      })();
    }, []);

    // Render

    return (
      <div
        className="bottom-0 fixed grid h-full left-0 place-items-center right-0 top-0 w-full"
        css={container}
      >
        <div
          className="absolute h-full w-full"
          css={css`
            ${background};
            ${isVisible ? fadeIn : fadeOut}
          `}
          onClick={handleClickCloseButton}
        />
        <div
          className="bg-white flex flex-col h-full w-full"
          css={css`
            ${body};
            ${isVisible ? bounceIn : bounceOut}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center">
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
                    <Exhibition3dRenderer />
                    <pointLight position={new Vector3(0, 0, -1)} />
                    <directionalLight
                      position={new Vector3(0, 0, 1)}
                      intensity={1}
                    />
                    <Exhibition3dCamera />
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
              <div css={description}>
                <div className="flex">
                  <div css={title}>タイトル</div>
                  <div className="ml-auto">2019/01/01</div>
                </div>
                <hr css={border} />
                <div className="flex">
                  <div css={character}>りぃちゃん</div>
                  <div css={character}>あ</div>
                </div>
                <div css={column}>
                  <div css={commentTitle}>コメント</div>
                  <div>
                    コメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメントコメント
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
