import { NextPage } from "next";
import React from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiFrameList } from "~/containers/Cheki/FrameList";
import { ChekiFramePreview } from "~/containers/Cheki/FramePreview";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";

export const ChekiFrames: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiFramePreview />
      <ChekiColumn>
        <ChekiFrameList />
      </ChekiColumn>
      <ChekiNavigation />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default ChekiFrames;
