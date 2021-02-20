import { NextPage } from "next";
import React from "react";
import { Exhibition3dAreaCloud } from "~/components/Exhibition/3d/Area/Cloud";
import { ExhibitionMenu } from "~/components/Exhibition/Menu";

const Exhibition: NextPage = () => (
  <>
    <Exhibition3dAreaCloud quality="high" />
    <ExhibitionMenu />
  </>
);

export default Exhibition;
