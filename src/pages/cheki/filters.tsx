import { css } from "linaria";
import { NextPage } from "next";
import React from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";

const cheki = css`
  flex-grow: 1;
  height: fit-content;
`;

export const Filters: NextPage = () => (
  <ChekiApp>
    <ChekiFlexColumn>
      <ChekiHeader />
      <ChekiCanvas preview={false} />
      <ChekiFilterList />
      <ChekiNavigation active="filters" />
    </ChekiFlexColumn>
  </ChekiApp>
);

export default Filters;
