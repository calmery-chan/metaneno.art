import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasContainer } from "~/containers/Cheki/CanvasContainer";
import { ChekiCanvasFilters } from "~/containers/Cheki/CanvasFilters";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";

export const ChekiFilters: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiCanvasContainer>
        <ChekiCanvas>
          <ChekiCanvasFilters />
        </ChekiCanvas>
      </ChekiCanvasContainer>
      <ChekiColumn>
        <ChekiFilterList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFilters;
