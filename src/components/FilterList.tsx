import { styled } from "linaria/react";
import React from "react";
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
};

export const FilterList: React.FC<FilterListProps> = ({ onClick }) => (
  <Horizontal padding={Spacing.l}>
    {CHEKI_FILTERS.map((filter, index) => (
      <Filter key={index} onClick={() => onClick(filter)}>
        <FilterTitle className={Typography.XS}>{filter}</FilterTitle>
        <ChekiFilterThumbnail filter={filter} />
      </Filter>
    ))}
  </Horizontal>
);
