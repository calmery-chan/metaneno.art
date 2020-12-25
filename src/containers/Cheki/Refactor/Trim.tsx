import { css, Theme } from "@emotion/react";
import styled, { Interpolation } from "@emotion/styled";
import { useCallback, useEffect, useRef } from "react";
import { ChekiCanvasTrim } from "~/containers/Cheki/CanvasTrim";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import {
  convertEventToCursorPositions,
  MouseRelatedEvent,
  TouchRelatedEvent,
  useDisplayable,
} from "~/utils/cheki";

// Styles

const canvas = css`
  position: absolute;
`;

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

const move = css`
  cursor: move;
`;

// Components

export const ChekiTrim: React.FC<{ emotion?: Interpolation<Theme> }> = ({
  emotion,
}) => {
  const dispatch = useDispatch();
  const displayable = useSelector(selectors.displayable);
  const trim = useSelector(selectors.trim);

  // Refs

  const canvasRef = useRef<SVGSVGElement>(null);

  // Events

  const handleOnComplete = useCallback(() => dispatch(actions.complete()), []);

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

    if (!current) return;

    current.addEventListener("touchmove", handleOnTick, { passive: false });

    return () => {
      current.removeEventListener("touchmove", handleOnTick);
    };
  }, [canvasRef]);

  // Displayable

  const containerRef = useDisplayable<HTMLDivElement>(
    handleOnUpdateDisplayable
  );

  // Render

  return (
    <Container css={emotion} ref={containerRef}>
      <svg
        css={canvas}
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
        <rect fill="#000" fillOpacity="0.48" height="100%" width="100%" />
        <ChekiCanvasTrim hidden />

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
            height={trim.displayMagnification}
            width="100%"
            x="0"
            y={trim.viewBoxHeight / 3}
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trim.displayMagnification}
            width="100%"
            x="0"
            y={(trim.viewBoxHeight / 3) * 2}
          />

          {/* Border */}

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trim.displayMagnification}
            width="100%"
            x="0"
            y="0"
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trim.displayMagnification}
            width="100%"
            x="0"
            y={trim.viewBoxHeight - trim.displayMagnification}
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height="100%"
            width={trim.displayMagnification}
            x="0"
            y="0"
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height="100%"
            width={trim.displayMagnification}
            x={trim.viewBoxWidth - trim.displayMagnification}
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

        <rect
          css={move}
          fillOpacity="0"
          height={trim.height}
          onMouseDown={handleOnStartDragging}
          onTouchStart={handleOnStartDragging}
          width={trim.width}
          x={trim.x - displayable.x}
          y={trim.y - displayable.y}
        />
      </svg>
    </Container>
  );
};
