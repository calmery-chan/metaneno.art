import { Theme } from "@emotion/react";
import styled, { Interpolation } from "@emotion/styled";
import React, { useCallback, useEffect, useRef } from "react";
import { ChekiCanvasTrim } from "./CanvasTrim";
import { useDispatch, useSelector, selectors } from "~/domains";
import { actions } from "~/domains/cheki";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
  useDisplayable,
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

const ChekiTrimImageOperator: React.FC = () => {
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
      style={{ cursor: "move" }}
      width={trim.width}
      x={trim.x - displayable.x}
      y={trim.y - displayable.y}
    />
  );
};

const ChekiTrimGrid: React.FC = () => {
  const cheki = useSelector(selectors.cheki);
  const { displayable, trim } = cheki.layout;

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
    >
      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x={trim.viewBoxWidth / 3}
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x={(trim.viewBoxWidth / 3) * 2}
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y={trim.viewBoxHeight / 3}
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y={(trim.viewBoxHeight / 3) * 2}
      />

      {/* Border */}

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height={1 * trim.displayMagnification}
        width="100%"
        x="0"
        y={trim.viewBoxHeight - 1 * trim.displayMagnification}
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x="0"
        y="0"
      />

      <rect
        fill="#fff"
        fillOpacity="0.48"
        height="100%"
        width={1 * trim.displayMagnification}
        x={trim.viewBoxWidth - 1 * trim.displayMagnification}
        y="0"
      />

      {/* Top - Left */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x="0"
        y="0"
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x="0"
        y="0"
      />

      {/* Top - Right */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x={trim.viewBoxWidth - 16 * trim.displayMagnification}
        y="0"
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x={trim.viewBoxWidth - 2 * trim.displayMagnification}
        y="0"
      />

      {/* Bottom - Left */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x="0"
        y={trim.viewBoxHeight - 2 * trim.displayMagnification}
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x="0"
        y={trim.viewBoxHeight - 16 * trim.displayMagnification}
      />

      {/* Bottom - Right */}

      <rect
        fill="#fff"
        height={2 * trim.displayMagnification}
        width={16 * trim.displayMagnification}
        x={trim.viewBoxWidth - 16 * trim.displayMagnification}
        y={trim.viewBoxHeight - 2 * trim.displayMagnification}
      />
      <rect
        fill="#fff"
        height={16 * trim.displayMagnification}
        width={2 * trim.displayMagnification}
        x={trim.viewBoxWidth - 2 * trim.displayMagnification}
        y={trim.viewBoxHeight - 16 * trim.displayMagnification}
      />
    </svg>
  );
};

export const ChekiTrim: React.FC<{ emotion?: Interpolation<Theme> }> = ({
  emotion,
}) => {
  const cheki = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  // Refs

  const canvasRef = useRef<SVGSVGElement>(null);

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

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

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

  const containerRef = useDisplayable<HTMLDivElement>(
    handleOnUpdateDisplayable
  );

  // Render

  return (
    <Container ref={containerRef} css={emotion}>
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
        <ChekiCanvasTrim />
        <ChekiTrimOverlay />
        <ChekiCanvasTrim hidden />
        <ChekiTrimGrid />
        <ChekiTrimImageOperator />
      </Canvas>
    </Container>
  );
};
