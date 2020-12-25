import React from "react";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import { getFrameSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasLayerFrameShadow: React.FC = () => {
  const direction = useSelector(selectors.imageDirection);
  const { height, width } = getFrameSizeByDirection(direction);

  return (
    <>
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="cheki-frame-shadow-image"
          x1="0"
          x2={width}
          y1="0"
          y2={height}
        >
          <stop stopColor="white" stopOpacity="0.04" />
          <stop offset="0.16" stopColor="black" stopOpacity="0.04" />
          <stop offset="0.64" stopColor="white" stopOpacity="0.04" />
          <stop offset="1" stopColor="black" stopOpacity="0.04" />
        </linearGradient>

        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={height + 2}
          id="cheki-frame-shadow"
          width={width}
          x="0"
          y="-2"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            in="SourceGraphic"
            in2="BackgroundImageFix"
            mode="normal"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="-2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend in2="shape" mode="normal" />
        </filter>
      </defs>

      <g filter="url(#cheki-frame-shadow)">
        <rect
          fill="url(#cheki-frame-shadow-image)"
          height={height}
          width={width}
          rx="8"
        />
      </g>
    </>
  );
};
