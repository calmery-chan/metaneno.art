import React from "react";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
} from "~/constants/cheki";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import {
  getFrameSizeByDirection,
  getImageSizeByDirection,
} from "~/utils/cheki";

export const ChekiCanvasLayerShadow: React.FC = () => {
  const direction = useSelector(selectors.imageDirection);
  const frame = getFrameSizeByDirection(direction);
  const image = getImageSizeByDirection(direction);

  return (
    <>
      <defs>
        <filter
          id="cheki-shadowed-image"
          x="0"
          y="0"
          height={frame.height}
          width={frame.width}
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
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
        </filter>

        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="cheki-frame-shadow-image"
          x1="0"
          x2={frame.width}
          y1="0"
          y2={frame.height}
        >
          <stop stopColor="white" stopOpacity="0.04" />
          <stop offset="0.16" stopColor="black" stopOpacity="0.04" />
          <stop offset="0.64" stopColor="white" stopOpacity="0.04" />
          <stop offset="1" stopColor="black" stopOpacity="0.04" />
        </linearGradient>

        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={frame.height + 2}
          id="cheki-frame-shadow"
          width={frame.width}
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

      <rect
        fill="#fff"
        transform={`translate(${CHEKI_FRAME_MARGIN_LEFT}, ${CHEKI_FRAME_MARGIN_TOP})`}
        width={image.width}
        height={image.height}
        filter="url(#cheki-shadowed-image)"
        fillOpacity="0.1"
      />

      <g filter="url(#cheki-frame-shadow)">
        <rect
          fill="url(#cheki-frame-shadow-image)"
          height={frame.height}
          width={frame.width}
          rx="8"
        />
      </g>
    </>
  );
};
