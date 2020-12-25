import { css } from "@emotion/react";
import { NextPage } from "next";
import { useCallback } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { CHEKI_FRAME_IMAGE_URLS } from "~/constants/cheki";
import { ChekiCanvasFrames } from "~/containers/Cheki/CanvasFrames";
import { ChekiApp } from "~/containers/Cheki/Refactor/App";
import { ChekiCanvas } from "~/containers/Cheki/Refactor/Canvas";
import { ChekiNavigation } from "~/containers/Cheki/Refactor/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const frame = css`
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
  const selectedFrame = useSelector(selectors.frame);

  // Events

  const handleOnClickFrameImage = useCallback(
    (index: number) => dispatch(actions.changeFrame({ index })),
    []
  );

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiCanvas>
          <ChekiCanvasFrames />
        </ChekiCanvas>
        <ChekiColumn>
          <ChekiHorizontal>
            {CHEKI_FRAME_IMAGE_URLS.map(({ name, url }, index) => (
              <div css={frame} key={index}>
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
