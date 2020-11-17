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
          href={image.url}
          width={image.width}
        />
      </svg>
    </svg>
  );
};
