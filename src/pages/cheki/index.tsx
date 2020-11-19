import { NextPage } from "next";
import React from "react";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCamera } from "~/containers/Cheki/Camera";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { SplashScreen } from "~/containers/Cheki/SplashScreen";

export const Cheki: NextPage = () => (
  <>
    <ChekiApp
      seoProps={{
        nofollow: false,
        noindex: false,
      }}
    >
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiCamera />
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>

    <SplashScreen />
  </>
);

export default Cheki;
