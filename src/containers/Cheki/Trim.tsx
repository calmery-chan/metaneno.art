import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef } from "react";
import { ChekiTrimGrid } from "./TrimGrid";
import { ChekiTrimImage } from "./TrimImage";
import { ChekiTrimImageOperator } from "./TrimImageOperator";
import { useDispatch, useSelector, selectors } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
} from "~/utils/cheki";

// Styles

const Canvas = styled.svg`
  position: absolute;
`;

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

const ChekiTrimOverlay: React.FC = () => (
  <rect fill="#000" fillOpacity="0.48" height="100%" width="100%" />
);

// Main

export const ChekiTrim: React.FC = () => {
  const cheki = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  // Refs

  const canvasRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { layout } = cheki;
  const { displayable } = layout;

  // Events

  const handleOnComplete = useCallback(() => dispatch(actions.complete()), []);

  const handleOnTick = useCallback(
    (event: MouseRelatedEvent | TouchRelatedEvent) => {
      event.preventDefault();
      event.stopPropagation();

      dispatch(
        actions.tick({
          cursorPositions: convertEventToCursorPositions(event),
        })
      );
    },
    []
  );

  const handleOnUpdateDisplayable = useCallback(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const { height, width, x, y } = current.getBoundingClientRect();
    dispatch(actions.updateTrimDisplayable({ height, width, x, y }));
  }, [containerRef]);

  // Side Effects

  useEffect(() => {
    const { current } = canvasRef;

    if (!current) {
      return;
    }

    current.addEventListener("touchmove", handleOnTick, { passive: false });

    return () => {
      current.removeEventListener("touchmove", handleOnTick);
    };
  }, [canvasRef]);

  useEffect(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(handleOnUpdateDisplayable);

    resizeObserver.observe(current);
    handleOnUpdateDisplayable();

    return () => {
      resizeObserver.unobserve(current);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  // Render

  return (
    <Container ref={containerRef}>
      <Canvas
        height={displayable.height}
        onMouseLeave={handleOnComplete}
        onMouseMove={handleOnTick}
        onMouseUp={handleOnComplete}
        onTouchEnd={handleOnComplete}
        ref={canvasRef}
        viewBox={`0 0 ${displayable.width} ${displayable.height}`}
        width={displayable.width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <ChekiTrimImage />
        <ChekiTrimOverlay />
        <ChekiTrimImage hidden />
        <ChekiTrimGrid />
        <ChekiTrimImageOperator />
      </Canvas>
    </Container>
  );
};
