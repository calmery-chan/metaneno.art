import React, { useCallback } from "react";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  MouseRelatedEvent,
  TouchRelatedEvent,
  convertEventToCursorPositions,
} from "~/utils/cheki";

export const ChekiTrimImageOperator: React.FC = () => {
  const dispatch = useDispatch();
  const cheki = useSelector(selectors.cheki);
  const { displayable, trim } = cheki.layout;

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

  return (
    <rect
      fillOpacity="0"
      height={trim.height}
      onMouseDown={handleOnStartDragging}
      onTouchStart={handleOnStartDragging}
      width={trim.width}
      x={trim.x - displayable.x}
      y={trim.y - displayable.y}
    />
  );
};
