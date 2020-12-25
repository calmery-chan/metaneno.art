import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvasFilters } from "~/containers/Cheki/CanvasFilters";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiCanvas } from "~/containers/Cheki/Refactor/Canvas";

export const ChekiFilters: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiCanvas>
        <ChekiCanvasFilters />
      </ChekiCanvas>
      <ChekiColumn>
        <ChekiFilterList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFilters;
