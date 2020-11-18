import { NextPage } from "next";
import React from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
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
