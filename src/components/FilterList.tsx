import { styled } from "linaria/react";
import React from "react";
import { GradientText } from "./GradientText";
import { Horizontal } from "./Horizontal";
import { ChekiFilter, CHEKI_FILTERS } from "~/constants/cheki";
import { ChekiFilterThumbnail } from "~/containers/ChekiFilterThumbnail";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Filter = styled.div`
  margin-right: ${Spacing.xs}px;

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

export const FilterList: React.FC<FilterListProps> = ({
  onClick,
  selected,
}) => (
  <Horizontal padding={Spacing.l}>
    {CHEKI_FILTERS.map((filter, index) => (
      <Filter key={index} onClick={() => onClick(filter)}>
        <FilterTitle className={Typography.XS}>
          {filter === selected ? <GradientText>{filter}</GradientText> : filter}
        </FilterTitle>
        <ChekiFilterThumbnail filter={filter} />
      </Filter>
    ))}
  </Horizontal>
);
