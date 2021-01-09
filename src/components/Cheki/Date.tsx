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
import { ChekiDirection, Hex } from "~/domains/cheki/models";
import { getImageSizeByDirection, getBlackOrWhiteByHex } from "~/utils/cheki";

export const ChekiDate: React.FC<{
  backgroundColor: Hex;
  createdDate: string | null;
  direction: ChekiDirection;
}> = React.memo(({ backgroundColor, createdDate, direction }) => {
  const fontColor = getBlackOrWhiteByHex(backgroundColor);
  const { height, width } = getImageSizeByDirection(direction);

  if (createdDate === null) {
    return null;
  }

  return (
    <svg
      height="40"
      width="216"
      x={width + CHEKI_FRAME_MARGIN_LEFT - 216 - 24}
      y={height + CHEKI_FRAME_MARGIN_TOP - 40 - 24}
    >
      <rect fill={backgroundColor} height="100%" width="100%" />
      {[].slice.call(createdDate).map((d, i) => {
        return (
          <g key={i} transform={`translate(${8 + (18 + 2) * i}, 8)`}>
            {(() => {
              switch (d) {
                case "0":
                  return <ChekiDateZero color={fontColor} />;

                case "1":
                  return <ChekiDateOne color={fontColor} />;

                case "2":
                  return <ChekiDateTwo color={fontColor} />;

                case "3":
                  return <ChekiDateThree color={fontColor} />;

                case "4":
                  return <ChekiDateFour color={fontColor} />;

                case "5":
                  return <ChekiDateFive color={fontColor} />;

                case "6":
                  return <ChekiDateSix color={fontColor} />;

                case "7":
                  return <ChekiDateSeven color={fontColor} />;

                case "8":
                  return <ChekiDateEight color={fontColor} />;

                case "9":
                  return <ChekiDateNine color={fontColor} />;

                case " ":
                  return <ChekiDateSpace />;

                case ".":
                  return <ChekiDateDot color={fontColor} />;

                default:
                  return null;
              }
            })()}
          </g>
        );
      })}
    </svg>
  );
});
