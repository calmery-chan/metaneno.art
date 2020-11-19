import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasContainer } from "~/containers/Cheki/CanvasContainer";
import { ChekiCanvasFrames } from "~/containers/Cheki/CanvasFrames";
import { ChekiFrameList } from "~/containers/Cheki/FrameList";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";

export const ChekiFrames: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiCanvasContainer>
        <ChekiCanvas>
          <ChekiCanvasFrames />
        </ChekiCanvas>
      </ChekiCanvasContainer>
      <ChekiColumn>
        <ChekiFrameList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFrames;
