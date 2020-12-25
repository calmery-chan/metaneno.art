import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { ChekiFilter, CHEKI_FILTERS } from "~/constants/cheki";
import { ChekiCanvasFilters } from "~/containers/Cheki/CanvasFilters";
import { ChekiFilterThumbnail } from "~/containers/Cheki/FilterThumbnail";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiApp } from "~/containers/Cheki/Refactor/App";
import { ChekiCanvas } from "~/containers/Cheki/Refactor/Canvas";
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
          <ChekiCanvasFilters />
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
