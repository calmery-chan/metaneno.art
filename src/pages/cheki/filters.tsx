import { NextPage } from "next";
import React from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";
import { ChekiFilterPreview } from "~/containers/Cheki/FilterPreview";

export const Filters: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiFilterPreview />
      <ChekiColumn>
        <ChekiFilterList />
      </ChekiColumn>
      <ChekiNavigation active="filters" />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default Filters;
