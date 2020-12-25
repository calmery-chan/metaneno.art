import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { ChekiFilter, CHEKI_FILTERS } from "~/constants/cheki";
import { ChekiFilterThumbnail } from "~/containers/Cheki/FilterThumbnail";
import { ChekiApp } from "~/containers/Cheki/Refactor/App";
import { ChekiCanvas } from "~/containers/Cheki/Refactor/Canvas";
import { ChekiCanvasTrimedImage } from "~/containers/Cheki/Refactor/CanvasTrimedImage";
import { ChekiNavigation } from "~/containers/Cheki/Refactor/Navigation";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const filter = css`
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

export const ChekiFilters: NextPage = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectors.imageFilter);
  const imageFilter = useSelector(selectors.imageFilter);
  const imageHeight = useSelector(selectors.imageHeight);
  const imageWidth = useSelector(selectors.imageWidth);
  const imageX = useSelector(selectors.imageX);
  const imageY = useSelector(selectors.imageY);

  // Events

  const handleOnClickFilter = useCallback(
    (filter: ChekiFilter | null) => dispatch(actions.changeFilter({ filter })),
    []
  );

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiCanvas>
          <ChekiCanvasTrimedImage>
            <svg
              height={imageHeight}
              viewBox={`0 0 ${imageWidth} ${imageHeight}`}
              width={imageWidth}
              x={imageX}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              y={imageY}
            >
              <ChekiFilterDefs />
              <ChekiFilterImage
                filter={imageFilter}
                height={imageHeight}
                width={imageWidth}
              />
            </svg>
          </ChekiCanvasTrimedImage>
        </ChekiCanvas>
        <ChekiColumn>
          <ChekiHorizontal>
            <div css={filter} onClick={() => handleOnClickFilter(null)}>
              <div css={label}>
                {selectedFilter === null ? (
                  <ChekiGradientText>none</ChekiGradientText>
                ) : (
                  <>none</>
                )}
              </div>
              <ChekiFilterThumbnail filter={null} />
            </div>

            {CHEKI_FILTERS.map((filter, key) => (
              <div
                css={filter}
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
                <ChekiFilterThumbnail filter={filter} />
              </div>
            ))}
          </ChekiHorizontal>
        </ChekiColumn>
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default ChekiFilters;
