import React, { useCallback, useEffect, useState } from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
} from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  getImageSizeByDirection,
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

export const ChekiCanvasImageLayer: React.FC = () => {
  const dispatch = useDispatch();
  const { image } = useSelector(selectors.cheki);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const { direction, filter } = image;

  const handleOnStartDragging = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      dispatch(
        actions.startImageDragging({
          cursorPositions: convertEventToCursorPositions(event),
        })
      );
    },
    []
  );

  useEffect(() => {
    const { height, width } = getImageSizeByDirection(direction);
    setHeight(height);
    setWidth(width);
  }, [direction]);

  return (
    <>
      <mask id="cheki-bordered-image">
        <rect height={height} width={width} fill="white" rx="4" />
      </mask>

      <defs>
        <filter
          id="cheki-shadowed-image"
          x="0"
          y="0"
          height={height}
          width={width}
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
      </defs>

      <svg
        height={height}
        onMouseDown={handleOnStartDragging}
        onTouchStart={handleOnStartDragging}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        x={CHEKI_FRAME_MARGIN_LEFT}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y={CHEKI_FRAME_MARGIN_TOP}
        mask="url(#cheki-bordered-image)"
      >
        <ChekiFilterDefs />
        <rect fill="#fff" width="100%" height="100%" />
        <svg
          height={image.height}
          viewBox={`0 0 ${image.width} ${image.height}`}
          width={image.width}
          x={image.x}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y={image.y}
        >
          <ChekiFilterImage
            filter={filter}
            height={image.height}
            width={image.width}
          />
        </svg>
        <g filter="url(#cheki-shadowed-image)">
          <rect fill="#fff" width="100%" height="100%" fillOpacity="0.1" />
        </g>
      </svg>
    </>
  );
};
