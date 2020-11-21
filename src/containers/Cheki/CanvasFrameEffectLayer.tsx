import React from "react";
import { selectors, useSelector } from "~/domains";
import { getFrameSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasFrameEffectLayer: React.FC = () => {
  const {
    image: { direction },
  } = useSelector(selectors.cheki);

  const { height, width } = getFrameSizeByDirection(direction);

  return (
    <>
      <defs>
        <linearGradient
          id="cheki-background"
          x1="0"
          y1="0"
          x2={width}
          y2={height}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" stopOpacity="0.04" />
          <stop offset="0.16" stopColor="black" stopOpacity="0.04" />
          <stop offset="0.64" stopColor="white" stopOpacity="0.04" />
          <stop offset="1" stopColor="black" stopOpacity="0.04" />
        </linearGradient>

        <filter
          id="cheki-border"
          x="0"
          y="-2"
          width={width}
          height={height + 2}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend mode="normal" in2="shape" />
        </filter>
      </defs>

      <g filter="url(#cheki-border)">
        <rect
          width={width}
          height={height}
          fill="url(#cheki-background)"
          rx="8"
        />
      </g>
    </>
  );
};
