import React from "react";
import { ChekiDateDot } from "./Date/Dot";
import { ChekiDateEight } from "./Date/Eight";
import { ChekiDateFive } from "./Date/Five";
import { ChekiDateFour } from "./Date/Four";
import { ChekiDateNine } from "./Date/Nine";
import { ChekiDateOne } from "./Date/One";
import { ChekiDateSeven } from "./Date/Seven";
import { ChekiDateSix } from "./Date/Six";
import { ChekiDateSpace } from "./Date/Space";
import { ChekiDateThree } from "./Date/Three";
import { ChekiDateTwo } from "./Date/Two";
import { ChekiDateZero } from "./Date/Zero";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
} from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";
import { getImageSizeByDirection } from "~/utils/cheki";

export const ChekiDate: React.FC = () => {
  const cheki = useSelector(selectors.cheki);
  const { createdDate, direction } = cheki.image;
  const { height, width } = getImageSizeByDirection(direction);

  if (createdDate === null) {
    return null;
  }

  console.log(createdDate);

  return (
    <svg
      height="40"
      width="216"
      x={width + CHEKI_FRAME_MARGIN_LEFT - 216 - 24}
      y={height + CHEKI_FRAME_MARGIN_TOP - 40 - 24}
    >
      <rect fill="#000" height="100%" width="100%" />
      {[].slice.call(createdDate).map((d, i) => {
        return (
          <g key={i} transform={`translate(${8 + (18 + 2) * i}, 8)`}>
            {(() => {
              console.log(d);
              switch (d) {
                case "0":
                  return <ChekiDateZero />;

                case "1":
                  return <ChekiDateOne />;

                case "2":
                  return <ChekiDateTwo />;

                case "3":
                  return <ChekiDateThree />;

                case "4":
                  return <ChekiDateFour />;

                case "5":
                  return <ChekiDateFive />;

                case "6":
                  return <ChekiDateSix />;

                case "7":
                  return <ChekiDateSeven />;

                case "8":
                  return <ChekiDateEight />;

                case "9":
                  return <ChekiDateNine />;

                case " ":
                  return <ChekiDateSpace />;

                case ".":
                  return <ChekiDateDot />;

                default:
                  return null;
              }
            })()}
          </g>
        );
      })}
    </svg>
  );
};
