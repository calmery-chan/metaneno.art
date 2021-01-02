import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { CHEKI_FRAME_IMAGE_URLS, PROCESSING_SCENARIO } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasChekiImage } from "~/containers/Cheki/CanvasChekiImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const items = css`
  height: 114px;
`;

const item = css`
  cursor: pointer;

  &:not(:last-child) {
    margin-right: ${Spacing.xs}px;
  }
`;

const thumbnail = css`
  height: 96px;
  width: 96px;
`;

const label = css`
  ${Typography.XS};

  color: ${Colors.gray};
  font-weight: bold;
  margin-bottom: ${Spacing.xs}px;
  text-align: center;
  text-transform: uppercase;
`;

// Components

export const ChekiFrames: NextPage = () => {
  const dispatch = useDispatch();
  const selectedFrame = useSelector(selectors.frameIndex);

  // Events

  const handleOnClickFrameImage = useCallback(
    (index: number) => dispatch(actions.changeFrame({ index })),
    []
  );

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader scenario={PROCESSING_SCENARIO} />
        <ChekiCanvas>
          <ChekiCanvasChekiImage />
        </ChekiCanvas>
        <ChekiColumn css={items}>
          <ChekiHorizontal>
            {CHEKI_FRAME_IMAGE_URLS.map(({ name, url }, index) => (
              <div css={item} key={index}>
                <div css={label}>
                  {index === selectedFrame ? (
                    <ChekiGradientText>{name}</ChekiGradientText>
                  ) : (
                    name
                  )}
                </div>
                <div
                  css={thumbnail}
                  onClick={() => handleOnClickFrameImage(index)}
                  style={{ background: `url(${url})`, backgroundSize: "cover" }}
                />
              </div>
            ))}
          </ChekiHorizontal>
        </ChekiColumn>
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default ChekiFrames;
