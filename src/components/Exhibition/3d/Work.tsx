import { css } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import { Scene, Vector3 } from "three";
import { ExhibitionPopup } from "../Popup";
import { Exhibition3dCamera } from "./Camera";
import { Exhibition3dCanvas } from "./Canvas";
import { Exhibition3dRenderer } from "./Renderer";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { getGltf } from "~/utils/exhibition";
import { Sentry } from "~/utils/sentry";
import { AreaWorkObject, GraphicsQuality } from "~/types/exhibition";

// Styles

const border = css`
  margin: ${Spacing.m}px 0;
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

const contents = css`
  grid-template-columns: 1fr 1fr;
  gap: ${Spacing.s}px;
  padding-top: ${Spacing.s}px;
`;

const description = css`
  ${Typography.S};
  padding: ${Spacing.m}px 0;
`;

const workCharacter = css`
  background: ${Colors.lightGray};
  border-radius: 2px;
  margin-right: ${Spacing.xs}px;
  padding: ${Spacing.xs}px ${Spacing.s}px;
`;

const workTitle = css`
  ${Typography.M};
  font-weight: bold;
`;

const toggle = css`
  ${Typography.S};
  background: rgba(0, 0, 0, .24);
  border-radius: 100%;
  color: ${Colors.white};
  height: 32px;
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;
  width: 32px;
`;

const view = css`
  background: ${Colors.lightGray};
  height: 100%;
`;

// Main

export const Exhibition3dWork = React.memo<AreaWorkObject & { graphicsQuality: GraphicsQuality, onClose: () => void }>(
  ({ characters, comment, date, graphicsQuality, imageUrl, onClose, title, url }) => {
    const [scene, setScene] = useState<Scene>();
    const [mode, setMode] = useState<"2d" | "3d">("2d");

    // Events

    const handleClickToggleMode = useCallback(() => {
      setMode(mode === "2d" ? "3d" : "2d");
    }, [mode]);

    // Side Effects

    useEffect(() => {
      (async () => {
        try {
          const { scene } = await getGltf(url);
          setScene(scene);
        } catch (error) {
          Sentry.captureException(error);
        }
      })();
    }, [url]);

    // Render

    return (
      <ExhibitionPopup onClose={onClose}>
        <div className="flex h-full" css={contents}>
          <div className="relative w-1/2" css={view}>
            {mode === "2d" && (
              <img
                className="h-full object-contain w-full"
                src={imageUrl}
              />
            )}
            {mode === "3d" && (
              <Exhibition3dCanvas>
                <Exhibition3dRenderer graphicsQuality={graphicsQuality} />
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
                className="absolute grid place-items-center"
                css={toggle}
                onClick={handleClickToggleMode}
              >
                {mode === "2d" && <div>2D</div>}
                {mode === "3d" && <div>3D</div>}
              </div>
            )}
          </div>
          <div className="w-1/2" css={description}>
            <div className="flex">
              <div css={workTitle}>{title}</div>
              <div className="ml-auto">{date}</div>
            </div>
            <hr css={border} />
            <div className="flex">
              {characters.map((character) => (
                <div css={workCharacter}>{character}</div>
              ))}
            </div>
            <div css={column}>
              <div css={commentTitle}>コメント</div>
              <div>{comment}</div>
            </div>
          </div>
        </div>
      </ExhibitionPopup>
    );
  }
);
