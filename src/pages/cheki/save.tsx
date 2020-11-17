import { NextPage } from "next";
import React from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNavigation } from "~/components/Cheki/Navigation";

export const Save: NextPage = () => (
  <ChekiApp>
    <ChekiHeader />
    <ChekiNavigation active="save" />
  </ChekiApp>
);

export default Save;
