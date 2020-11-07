import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef } from "react";
import { ChekiCanvasFrameLayer } from "./ChekiCanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./ChekiCanvasImageLayer";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

const Svg = styled.svg`
  position: fixed;
`;

export const ChekiCanvas: React.FC = () => {
  const cheki = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  const { layout, temporaries } = cheki;
  const { displayable, frame } = layout;
  const { isImageDragging } = temporaries;

  /* --- Refs --- */

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* --- Events ---*/

  const handleOnUpdateDisplayable = useCallback(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const { height, width, x, y } = current.getBoundingClientRect();
    dispatch(actions.updateDisplayable({ height, width, x, y }));
  }, [containerRef]);

  /* --- Control Events --- */

  const handleOnComplete = useCallback(() => dispatch(actions.complete()), []);

  const handleOnTick = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const cursorPositions = convertEventToCursorPositions(event);
      dispatch(actions.tick({ cursorPositions }));
    },
    [isImageDragging]
  );

  /* --- Side Effects --- */

  useEffect(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleOnUpdateDisplayable);

    resizeObserver.observe(current);

    return () => {
      resizeObserver.unobserve(current);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  useEffect(() => {
    const { current } = svgRef;

    if (!current) {
      return;
    }

    current.addEventListener("touchmove", handleOnTick, { passive: false });

    return () => {
      current.removeEventListener("touchmove", handleOnTick);
    };
  }, [svgRef]);

  /* --- Render --- */

  return (
    <Container ref={containerRef}>
      <Svg
        height={displayable.height}
        onMouseLeave={handleOnComplete}
        onMouseMove={handleOnTick}
        onMouseUp={handleOnComplete}
        onTouchEnd={handleOnComplete}
        // `{ passive: false }` を渡すことができないため `useEffect` 内で登録する
        // onTouchMove={handleOnTick}
        ref={svgRef}
        viewBox={`0 0 ${displayable.width} ${displayable.height}`}
        width={displayable.width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect fill="#000" width="100%" height="100%" />

        <svg
          height={frame.height}
          width={frame.width}
          x={frame.x - displayable.x}
          y={frame.y - displayable.y}
          viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <ChekiCanvasFrameLayer />
          <ChekiCanvasImageLayer />
        </svg>
      </Svg>
    </Container>
  );
};
