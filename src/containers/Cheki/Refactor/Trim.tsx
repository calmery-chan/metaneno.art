import { css, Theme } from "@emotion/react";
import styled, { Interpolation } from "@emotion/styled";
import { useCallback, useEffect, useRef } from "react";
import { ChekiCanvasTrim } from "~/containers/Cheki/CanvasTrim";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors as chekiSelectors } from "~/domains/cheki";
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
  const displayableHeight = useSelector(chekiSelectors.displayableHeight);
  const displayableWidth = useSelector(chekiSelectors.displayableWidth);
  const displayableX = useSelector(chekiSelectors.displayableX);
  const displayableY = useSelector(chekiSelectors.displayableY);
  const trimDisplayMagnification = useSelector(
    chekiSelectors.trimDisplayMagnification
  );
  const trimHeight = useSelector(chekiSelectors.trimHeight);
  const trimWidth = useSelector(chekiSelectors.trimWidth);
  const trimViewBoxHeight = useSelector(chekiSelectors.trimViewBoxHeight);
  const trimViewBoxWidth = useSelector(chekiSelectors.trimViewBoxWidth);
  const trimX = useSelector(chekiSelectors.trimX);
  const trimY = useSelector(chekiSelectors.trimY);

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
        height={displayableHeight}
        onMouseLeave={handleOnComplete}
        onMouseMove={handleOnTick}
        onMouseUp={handleOnComplete}
        onTouchEnd={handleOnComplete}
        ref={canvasRef}
        viewBox={`0 0 ${displayableWidth} ${displayableHeight}`}
        width={displayableWidth}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <ChekiCanvasTrim />
        <rect fill="#000" fillOpacity="0.48" height="100%" width="100%" />
        <ChekiCanvasTrim hidden />

        <svg
          height={trimHeight}
          viewBox={`0 0 ${trimViewBoxWidth} ${trimViewBoxHeight}`}
          width={trimWidth}
          x={trimX - displayableX}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y={trimY - displayableY}
        >
          <rect
            fill="#fff"
            fillOpacity="0.48"
            height="100%"
            width={1 * trimDisplayMagnification}
            x={trimViewBoxWidth / 3}
            y="0"
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height="100%"
            width={1 * trimDisplayMagnification}
            x={(trimViewBoxWidth / 3) * 2}
            y="0"
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trimDisplayMagnification}
            width="100%"
            x="0"
            y={trimViewBoxHeight / 3}
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trimDisplayMagnification}
            width="100%"
            x="0"
            y={(trimViewBoxHeight / 3) * 2}
          />

          {/* Border */}

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trimDisplayMagnification}
            width="100%"
            x="0"
            y="0"
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height={trimDisplayMagnification}
            width="100%"
            x="0"
            y={trimViewBoxHeight - trimDisplayMagnification}
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height="100%"
            width={trimDisplayMagnification}
            x="0"
            y="0"
          />

          <rect
            fill="#fff"
            fillOpacity="0.48"
            height="100%"
            width={trimDisplayMagnification}
            x={trimViewBoxWidth - trimDisplayMagnification}
            y="0"
          />

          {/* Top - Left */}

          <rect
            fill="#fff"
            height={2 * trimDisplayMagnification}
            width={16 * trimDisplayMagnification}
            x="0"
            y="0"
          />
          <rect
            fill="#fff"
            height={16 * trimDisplayMagnification}
            width={2 * trimDisplayMagnification}
            x="0"
            y="0"
          />

          {/* Top - Right */}

          <rect
            fill="#fff"
            height={2 * trimDisplayMagnification}
            width={16 * trimDisplayMagnification}
            x={trimViewBoxWidth - 16 * trimDisplayMagnification}
            y="0"
          />
          <rect
            fill="#fff"
            height={16 * trimDisplayMagnification}
            width={2 * trimDisplayMagnification}
            x={trimViewBoxWidth - 2 * trimDisplayMagnification}
            y="0"
          />

          {/* Bottom - Left */}

          <rect
            fill="#fff"
            height={2 * trimDisplayMagnification}
            width={16 * trimDisplayMagnification}
            x="0"
            y={trimViewBoxHeight - 2 * trimDisplayMagnification}
          />
          <rect
            fill="#fff"
            height={16 * trimDisplayMagnification}
            width={2 * trimDisplayMagnification}
            x="0"
            y={trimViewBoxHeight - 16 * trimDisplayMagnification}
          />

          {/* Bottom - Right */}

          <rect
            fill="#fff"
            height={2 * trimDisplayMagnification}
            width={16 * trimDisplayMagnification}
            x={trimViewBoxWidth - 16 * trimDisplayMagnification}
            y={trimViewBoxHeight - 2 * trimDisplayMagnification}
          />
          <rect
            fill="#fff"
            height={16 * trimDisplayMagnification}
            width={2 * trimDisplayMagnification}
            x={trimViewBoxWidth - 2 * trimDisplayMagnification}
            y={trimViewBoxHeight - 16 * trimDisplayMagnification}
          />
        </svg>

        <rect
          css={move}
          fillOpacity="0"
          height={trimHeight}
          onMouseDown={handleOnStartDragging}
          onTouchStart={handleOnStartDragging}
          width={trimWidth}
          x={trimX - displayableX}
          y={trimY - displayableY}
        />
      </svg>
    </Container>
  );
};
