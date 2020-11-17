import { NextPage } from "next";
import React from "react";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { Header } from "~/components/Header";
import { Page } from "~/components/Page";

export const Save: NextPage = () => (
  <Page>
    <Header />
    <ChekiNavigation active="save" />
  </Page>
);

export default Save;
