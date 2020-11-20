import React, { useCallback, useState } from "react";
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
  const [timer, setTimer] = useState<number | null>(null);

  const handleOnClick = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.stopPropagation();

      if (timer) {
        clearTimeout(timer);

        const [cursorPosition] = convertEventToCursorPositions(event);

        dispatch(actions.focus(cursorPosition));
      }
    },
    [timer]
  );

  const handleOnStartDragging = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.stopPropagation();

      const timer = window.setTimeout(() => {
        clearTimeout(timer);
        setTimer(null);

        dispatch(
          actions.startImageDragging({
            cursorPositions: convertEventToCursorPositions(event),
          })
        );
      }, 100);

      setTimer(timer);
    },
    []
  );

  return (
    <rect
      fillOpacity="0"
      height={trim.height}
      onClick={handleOnClick}
      onMouseDown={handleOnStartDragging}
      onTouchStart={handleOnStartDragging}
      style={{ cursor: "move" }}
      width={trim.width}
      x={trim.x - displayable.x}
      y={trim.y - displayable.y}
    />
  );
};
