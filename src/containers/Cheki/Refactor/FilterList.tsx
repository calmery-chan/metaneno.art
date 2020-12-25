import { css } from "@emotion/react";
import React, { useCallback } from "react";
import { ChekiGradientText } from "~/components/Cheki/GradientText";
import { ChekiHorizontal } from "~/components/Cheki/Horizontal";
import { ChekiFilter, CHEKI_FILTERS } from "~/constants/cheki";
import { ChekiFilterThumbnail } from "~/containers/Cheki/FilterThumbnail";
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

export const ChekiFilterList: React.FC = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector(selectors.imageFilter);

  // Events

  const handleOnClickFilter = useCallback(
    (filter: ChekiFilter | null) => dispatch(actions.changeFilter({ filter })),
    []
  );

  // Render

  return (
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
        <div css={filter} key={key} onClick={() => handleOnClickFilter(filter)}>
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
  );
};
