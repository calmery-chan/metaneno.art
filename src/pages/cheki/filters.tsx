import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";
import { ChekiFilterPreview } from "~/containers/Cheki/FilterPreview";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";

export const ChekiFilters: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiFilterPreview />
      <ChekiColumn>
        <ChekiFilterList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFilters;
