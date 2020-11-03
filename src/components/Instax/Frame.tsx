import React from "react";

const MARGIN_FRAME_BOTTOM = 352;
const MARGIN_FRAME_HORIZONTAL = 96;
const MARGIN_FRAME_TOP = 128;

export const Frame: React.FC<
  React.SVGProps<SVGPathElement> & { width: number; height: number }
> = (props) => {
  const { width, height } = props;

  return (
    <path
      d={`M${width} 0H0V${height}H${width}V0ZM${
        width - MARGIN_FRAME_HORIZONTAL
      } ${MARGIN_FRAME_TOP}H${MARGIN_FRAME_HORIZONTAL}V${
        height - MARGIN_FRAME_BOTTOM
      }H${width - MARGIN_FRAME_HORIZONTAL}V${MARGIN_FRAME_TOP}Z`}
      fill="black"
      fillRule="evenodd"
      {...props}
    />
  );
};
