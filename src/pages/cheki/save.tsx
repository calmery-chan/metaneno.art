import { NextPage } from "next";
import React from "react";
import { Controller } from "~/components/Controller";
import { Header } from "~/components/Header";
import { Page } from "~/components/Page";

export const Save: NextPage = () => (
  <Page>
    <Header />
    <Controller active="save" />
  </Page>
);

export default Save;
