import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChekiCanvasFrameLayer } from "./ChekiCanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./ChekiCanvasImageLayer";
import {
  CHEKI_HORIZONTAL_FRAME_HEIGHT,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_FRAME_WIDTH,
} from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  calculateCanvasPositionAndSize,
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

  const { direction, isImageDragging, isImageRotating, isImageScaling } = cheki;

  /* --- Refs --- */

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  /* --- States --- */

  const [displayable, setDisplayable] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const [frame, setFrame] = useState({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const [frameViewBox, setFrameViewBox] = useState({
    height: 0,
    width: 0,
  });

  /* --- Events ---*/

  const handleOnUpdateDisplayable = useCallback(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const displayable = current.getBoundingClientRect();

    setDisplayable(displayable);
  }, [containerRef]);

  const handleOnUpdateFrame = useCallback(() => {
    const nextFrameViewBox = {
      height:
        direction === "horizontal"
          ? CHEKI_HORIZONTAL_FRAME_HEIGHT
          : CHEKI_VERTICAL_FRAME_HEIGHT,
      width:
        direction === "horizontal"
          ? CHEKI_HORIZONTAL_FRAME_WIDTH
          : CHEKI_VERTICAL_FRAME_WIDTH,
    };

    setFrame(calculateCanvasPositionAndSize(displayable, nextFrameViewBox));
    setFrameViewBox(nextFrameViewBox);
  }, [direction, displayable]);

  /* --- Control Events --- */

  const handleOnComplete = useCallback(() => dispatch(actions.complete()), []);

  const handleOnTick = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      if (!isImageDragging && !isImageRotating && !isImageScaling) {
        return;
      }

      const cursorPositions = convertEventToCursorPositions(event);
      dispatch(actions.tick({ cursorPositions }));
    },
    [isImageDragging, isImageRotating, isImageScaling]
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
    handleOnUpdateFrame();
  }, [direction, displayable]);

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
          viewBox={`0 0 ${frameViewBox.width} ${frameViewBox.height}`}
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
