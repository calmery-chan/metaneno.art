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

type ChekiDateProps = {
  date: string;
};

export const ChekiDate: React.FC<ChekiDateProps> = ({ date: maybeDate }) => {
  const [date, setDate] = useState<string | null>(null);

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
    <svg>
      {[].slice.call(date).map((d, i) => {
        return (
          <g key={i} transform={`translate(${18 * i}, 0)`}>
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
