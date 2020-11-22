import React from "react";
import {
  A6,
  ACG,
  B5,
  C1,
  F2,
  G3,
  HB1,
  HB2,
  InternalImage,
  KK2,
  LV3,
  M3,
  M5,
  P5,
  T1,
  X1,
} from "./FilterDefs";
import { ChekiFilter } from "~/constants/cheki";

export const ChekiFilterImage: React.FC<{
  filter: ChekiFilter | null;
  height: number;
  width: number;
  noImage?: boolean;
  x?: number;
  y?: number;
}> = (props) => {
  const { filter } = props;

  switch (filter) {
    case "c1":
      return <C1 {...props} />;
    case "f2":
      return <F2 {...props} />;
    case "g3":
      return <G3 {...props} />;
    case "p5":
      return <P5 {...props} />;
    case "hb1":
      return <HB1 {...props} />;
    case "hb2":
      return <HB2 {...props} />;
    case "acg":
      return <ACG {...props} />;
    case "lv3":
      return <LV3 {...props} />;
    case "m5":
      return <M5 {...props} />;
    case "a6":
      return <A6 {...props} />;
    case "kk2":
      return <KK2 {...props} />;
    case "m3":
      return <M3 {...props} />;
    case "t1":
      return <T1 {...props} />;
    case "b5":
      return <B5 {...props} />;
    case "x1":
      return <X1 {...props} />;
    default: {
      return <InternalImage {...props} filter={undefined} />;
    }
  }
};
