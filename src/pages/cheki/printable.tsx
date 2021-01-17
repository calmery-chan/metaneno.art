import { NextPage } from "next";
import React from "react";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvasPrintableImage } from "~/containers/Cheki/CanvasPrintableImage";

const Printable: NextPage = () => {
  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiCanvasPrintableImage id="test" />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default Printable;
