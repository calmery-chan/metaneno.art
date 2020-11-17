import { styled } from "linaria/react";
import React from "react";
import { ChekiGradientText } from "../../components/Cheki/GradientText";
import { ChekiHorizontal } from "../../components/Cheki/Horizontal";
import { ChekiFilter, CHEKI_FILTERS } from "~/constants/cheki";
import { ChekiFilterThumbnail } from "~/containers/Cheki/FilterThumbnail";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Container = styled.div`
  margin-top: ${Spacing.m}px;

  /* &:hover .filter:not(:hover) {
    opacity: 0.48;
  } */
`;

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

type FilterListProps = {
  onClick: (filter: ChekiFilter) => void;
  selected: ChekiFilter;
};

export const ChekiFilterList: React.FC<FilterListProps> = ({
  onClick,
  selected,
}) => (
  <Container>
    <ChekiHorizontal padding={Spacing.l}>
      {CHEKI_FILTERS.map((filter, index) => (
        <Filter className="filter" key={index} onClick={() => onClick(filter)}>
          <FilterTitle className={Typography.XS}>
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
  </Container>
);
