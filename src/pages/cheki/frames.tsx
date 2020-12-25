import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvasFrames } from "~/containers/Cheki/CanvasFrames";
import { ChekiFrameList } from "~/containers/Cheki/FrameList";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiCanvas } from "~/containers/Cheki/Refactor/Canvas";

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
