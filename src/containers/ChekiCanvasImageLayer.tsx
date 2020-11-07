import React, { useCallback, useEffect, useState } from "react";
import {
  CHEKI_FRAME_MARGIN_LEFT,
  CHEKI_FRAME_MARGIN_TOP,
  CHEKI_HORIZONTAL_IMAGE_HEIGHT,
  CHEKI_HORIZONTAL_IMAGE_WIDTH,
  CHEKI_VERTICAL_IMAGE_HEIGHT,
  CHEKI_VERTICAL_IMAGE_WIDTH,
} from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

export const ChekiCanvasImageLayer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    direction,
    imageHeight,
    imagePositionX,
    imagePositionY,
    imageUrl,
    imageWidth,
  } = useSelector(selectors.cheki);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

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
    switch (direction) {
      case "horizontal": {
        setHeight(CHEKI_HORIZONTAL_IMAGE_HEIGHT);
        setWidth(CHEKI_HORIZONTAL_IMAGE_WIDTH);
        return;
      }

      case "vertical": {
        setHeight(CHEKI_VERTICAL_IMAGE_HEIGHT);
        setWidth(CHEKI_VERTICAL_IMAGE_WIDTH);
        return;
      }
    }
  }, [direction]);

  return (
    <svg
      height={height}
      onMouseDown={handleOnStartDragging}
      onTouchStart={handleOnStartDragging}
      width={width}
      x={CHEKI_FRAME_MARGIN_LEFT}
      y={CHEKI_FRAME_MARGIN_TOP}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter id="cheki-canvas-image-layer" colorInterpolationFilters="sRGB">
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values={[
              [0.8, 0, 0, 0, 0],
              [0, 0.8, 0, 0, 0],
              [0, 0, 0.8, 0, 0],
              [0, 0, 0, 1, 0],
            ].join(" ")}
          />
          <feComponentTransfer>
            <feFuncR type="linear" slope="1" intercept={0.2 * (120 / 255)} />
            <feFuncG type="linear" slope="1" intercept={0.2 * (70 / 255)} />
            <feFuncB type="linear" slope="1" intercept={0.2 * (13 / 255)} />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect fill="#fff" width="100%" height="100%" />
      <image
        filter="url(#cheki-canvas-image-layer)"
        height={imageHeight}
        width={imageWidth}
        x={imagePositionX}
        xlinkHref={imageUrl}
        y={imagePositionY}
      />
    </svg>
  );
};
