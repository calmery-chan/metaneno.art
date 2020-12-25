import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiCanvasFrames } from "~/containers/Cheki/CanvasFrames";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiApp } from "~/containers/Cheki/Refactor/App";
import { ChekiCanvas } from "~/containers/Cheki/Refactor/Canvas";
import { ChekiFrameList } from "~/containers/Cheki/Refactor/FrameList";

export const ChekiFrames: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiCanvas>
        <ChekiCanvasFrames />
      </ChekiCanvas>
      <ChekiColumn>
        <ChekiFrameList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFrames;
