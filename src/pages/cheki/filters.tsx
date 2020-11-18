import { css } from "linaria";
import { NextPage } from "next";
import React from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";
import { ChekiFilterPreview } from "~/containers/Cheki/FilterPreview";

const cheki = css`
  flex-grow: 1;
  height: fit-content;
`;

export const Filters: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiFilterPreview />
      <ChekiFilterList />
      <ChekiNavigation active="filters" />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default Filters;
