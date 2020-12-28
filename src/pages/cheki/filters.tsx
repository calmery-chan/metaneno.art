import { css } from "@emotion/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import platform from "platform";
import React, { useCallback, useState } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { Tutorial } from "~/components/Cheki/Tutorial";
import {
  ChekiFilter,
  CHEKI_FILTERS,
  CHEKI_THUMBNAIL_IMAGE_SIZE,
  FILTERS_PAGE_SCENARIO,
} from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasImage } from "~/containers/Cheki/CanvasImage";
import { ChekiCanvasTrimedImage } from "~/containers/Cheki/CanvasTrimedImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { getTutorialElementId } from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

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

const label = css`
  ${Typography.XS};

  color: ${Colors.gray};
  font-weight: bold;
  margin-bottom: ${Spacing.xs}px;
  text-align: center;
  text-transform: uppercase;
`;

// Components

const Thumbnail: React.FC<{
  filter: ChekiFilter | null;
  isFirefox: boolean;
}> = ({ filter, isFirefox }) => {
  const { viewBoxHeight, viewBoxWidth } = useSelector(selectors.trim);

  return (
    <svg
      height={CHEKI_THUMBNAIL_IMAGE_SIZE / 2}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
    >
      <ChekiCanvasImage filter={filter} noImage={isFirefox} />
    </svg>
  );
};

export const ChekiFilters: NextPage = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectors.imageFilter);
  const [isTutorial, setIsTutorial] = useState(true);
  const { pathname } = useRouter();

  // Events

  const handleOnClickFilter = useCallback(
    (filter: ChekiFilter | null) => dispatch(actions.changeFilter({ filter })),
    []
  );

  const handleOnCompleteTutorial = useCallback(() => {
    setIsTutorial(false);
    GA.completeTutorial(pathname);
  }, [pathname]);

  const handleOnStopTutorial = useCallback(() => {
    setIsTutorial(false);
    GA.stopTutorial(pathname);
  }, [pathname]);

  // Render

  const isFirefox = !!platform.name && platform.name === "Firefox";

  return (
    <>
      <ChekiApp>
        <ChekiFlexColumn>
          <ChekiHeader />
          <ChekiCanvas>
            <ChekiCanvasTrimedImage />
          </ChekiCanvas>
          <ChekiColumn css={items}>
            <ChekiHorizontal id={getTutorialElementId("filters")}>
              <div css={item} onClick={() => handleOnClickFilter(null)}>
                <div css={label}>
                  {selectedFilter === null ? (
                    <ChekiGradientText>none</ChekiGradientText>
                  ) : (
                    <>none</>
                  )}
                </div>
                <Thumbnail filter={null} isFirefox={isFirefox} />
              </div>

              {CHEKI_FILTERS.map((filter, key) => (
                <div
                  css={item}
                  key={key}
                  onClick={() => handleOnClickFilter(filter)}
                >
                  <div css={label}>
                    {selectedFilter === filter ? (
                      <ChekiGradientText>{filter}</ChekiGradientText>
                    ) : (
                      filter
                    )}
                  </div>
                  <Thumbnail filter={filter} isFirefox={isFirefox} />
                </div>
              ))}
            </ChekiHorizontal>
          </ChekiColumn>
          <ChekiNavigation />
        </ChekiFlexColumn>
      </ChekiApp>

      {isTutorial && (
        <Tutorial
          scenarios={FILTERS_PAGE_SCENARIO}
          onComplete={handleOnCompleteTutorial}
          onStop={handleOnStopTutorial}
        />
      )}
    </>
  );
};

export default ChekiFilters;
