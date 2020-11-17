import { css } from "linaria";
import { NextPage } from "next";
import React from "react";
import { Controller } from "~/components/Controller";
import { FilterList } from "~/components/FilterList";
import { Header } from "~/components/Header";
import { Page } from "~/components/Page";
import { ChekiCanvas } from "~/containers/ChekiCanvas";

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
  <Page>
    <div className={column}>
      <Header />
      <div className={cheki}>
        <ChekiCanvas preview={false} />
      </div>
      <FilterList onClick={console.log} selected="f2" />
      <Controller active="filters" />
    </div>
  </Page>
);

export default Filters;
