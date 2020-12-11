import React, { useEffect, useState } from "react";
import { ChekiDateEight } from "./Date/Eight";
import { ChekiDateFive } from "./Date/Five";
import { ChekiDateFour } from "./Date/Four";
import { ChekiDateNine } from "./Date/Nine";
import { ChekiDateOne } from "./Date/One";
import { ChekiDateSeven } from "./Date/Seven";
import { ChekiDateSix } from "./Date/Six";
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
  const [date, setDate] = useState<string | null>(null);
  const { direction } = cheki.image;
  const { height, width } = getImageSizeByDirection(direction);
  const maybeDate = "2020/12/10";

  // Side Effects

  useEffect(() => {
    const d = new Date(maybeDate);
    setDate(`${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`);
  }, [maybeDate]);

  // Render

  if (!date) {
    return null;
  }

  return (
    <svg
      height="40"
      width="160"
      x={width + CHEKI_FRAME_MARGIN_LEFT - 160 - 24}
      y={height + CHEKI_FRAME_MARGIN_TOP - 40 - 24}
    >
      <rect fill="#000" height="100%" width="100%" />
      {[].slice.call(date).map((d, i) => {
        return (
          <g key={i} transform={`translate(${8 + 18 * i}, 8)`}>
            {(() => {
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
