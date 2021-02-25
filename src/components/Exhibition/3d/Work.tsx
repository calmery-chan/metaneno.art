import { css } from "@emotion/react";
import classnames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { Scene, Vector3 } from "three";
import { ExhibitionPopup } from "../Popup";
import { Exhibition3dCamera } from "./Camera";
import { Exhibition3dCanvas } from "./Canvas";
import { Exhibition3dRenderer } from "./Renderer";
import { useScreenOrientation } from "~/hooks/exhibition/useScreenOrientation";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { AreaWorkObject, GraphicsQuality } from "~/types/exhibition";
import { getGltf } from "~/utils/exhibition";
import * as GA from "~/utils/exhibition/google-analytics";
import { Sentry } from "~/utils/sentry";

// Styles

const border = css`
  margin: ${Spacing.m}px 0;
`;

const column = css`
  ${Typography.S};
  border-bottom: 1px solid ${Colors.lightGray};
  margin: ${Spacing.m}px 0;

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
  padding-top: ${Spacing.s}px;
`;

const description = css`
  ${Typography.S};
  padding: ${Spacing.m}px 0;
  padding-left: ${Spacing.s}px;
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
  background: rgba(0, 0, 0, 0.24);
  border-radius: 100%;
  color: ${Colors.white};
  height: 32px;
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;
  width: 32px;
`;

const view = css`
  background: ${Colors.lightGray};
`;

// Main

export const Exhibition3dWork = React.memo<
  AreaWorkObject & { graphicsQuality: GraphicsQuality; onClose: () => void }
>(
  ({
    characters,
    comment,
    date,
    graphicsQuality,
    id,
    imageUrl,
    onClose,
    title,
    url,
  }) => {
    const { orientation } = useScreenOrientation();
    const [scene, setScene] = useState<Scene>();
    const [mode, setMode] = useState<"2d" | "3d">("2d");

    const isPortrait = orientation === "portrait";

    // Events

    const handleClickToggleMode = useCallback(() => {
      setMode(mode === "2d" ? "3d" : "2d");
    }, [mode]);

    // Side Effects

    useEffect(() => {
      GA.view(id);
    }, [id]);

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
        <div
          className={classnames("flex h-full", {
            "flex-col": isPortrait,
            "flex-row": !isPortrait,
          })}
          css={contents}
        >
          <div
            className={classnames("relative", {
              "h-1/2 w-full": isPortrait,
              "h-full w-1/2": !isPortrait,
            })}
            css={view}
          >
            {mode === "2d" && (
              <img
                className="object-contain w-full h-full"
                src={`${
                  (process.env.NODE_ENV === "production"
                    ? "https://assets.metaneno.art"
                    : "http://localhost:8000") + imageUrl
                }`}
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
                className="absolute grid cursor-pointer place-items-center"
                css={toggle}
                onClick={handleClickToggleMode}
              >
                {mode === "2d" && <div>2D</div>}
                {mode === "3d" && <div>3D</div>}
              </div>
            )}
          </div>
          <div
            className={classnames("overflow-scroll", {
              "h-1/2 w-full": isPortrait,
              "h-full w-1/2": !isPortrait,
            })}
            css={description}
          >
            <div className="flex">
              <div css={workTitle}>{title}</div>
              <div className="ml-auto">{date}</div>
            </div>
            <hr css={border} />
            {characters.length ? (
              <div className="flex">
                {characters.map((character, index) => (
                  <div css={workCharacter} key={index}>
                    {character}
                  </div>
                ))}
              </div>
            ) : null}
            <div css={column}>
              <div css={commentTitle}>コメント</div>
              <div className="whitespace-pre-line">{comment}</div>
            </div>
          </div>
        </div>
      </ExhibitionPopup>
    );
  }
);
