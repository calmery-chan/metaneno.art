import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { ChekiGradientText } from "../../components/Cheki/GradientText";
import { ChekiHorizontal } from "../../components/Cheki/Horizontal";
import { ChekiFilter, CHEKI_FILTERS } from "~/constants/cheki";
import { ChekiFilterThumbnail } from "~/containers/Cheki/FilterThumbnail";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Filter = styled.div`
  /* ${Mixin.clickable}; */

  margin-right: ${Spacing.xs}px;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
`;

const FilterTitle = styled.div`
  color: ${Colors.gray};
  font-weight: bold;
  margin-bottom: ${Spacing.xs}px;
  text-align: center;
  text-transform: uppercase;
`;

export const ChekiFilterList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    image: { filter: selected },
  } = useSelector(selectors.cheki);

  const handleOnClickFilter = useCallback(
    (filter: ChekiFilter | null) => dispatch(actions.changeFilter({ filter })),
    []
  );

  return (
    <ChekiHorizontal padding={Spacing.l}>
      <Filter className="filter" onClick={() => handleOnClickFilter(null)}>
        <FilterTitle css={Typography.XS}>
          {selected === null ? (
            <ChekiGradientText>None</ChekiGradientText>
          ) : (
            <>None</>
          )}
        </FilterTitle>
        <ChekiFilterThumbnail filter={null} />
      </Filter>
      {CHEKI_FILTERS.map((filter, index) => (
        <Filter
          className="filter"
          key={index}
          onClick={() => handleOnClickFilter(filter)}
        >
          <FilterTitle css={Typography.XS}>
            {filter === selected ? (
              <ChekiGradientText>{filter}</ChekiGradientText>
            ) : (
              filter
            )}
          </FilterTitle>
          <ChekiFilterThumbnail filter={filter} />
        </Filter>
      ))}
    </ChekiHorizontal>
  );
};
