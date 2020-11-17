import { css } from "linaria";
import { NextPage } from "next";
import React from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiFilterList } from "~/containers/Cheki/FilterList";

const cheki = css`
  flex-grow: 1;
  height: fit-content;
`;

const column = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Filters: NextPage = () => (
  <ChekiApp>
    <div className={column}>
      <ChekiHeader />
      <div className={cheki}>
        <ChekiCanvas preview={false} />
      </div>
      <ChekiFilterList onClick={console.log} selected="f2" />
      <ChekiNavigation active="filters" />
    </div>
  </ChekiApp>
);

export default Filters;
