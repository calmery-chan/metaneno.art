import { Theme } from "@emotion/react";
import styled, { Interpolation } from "@emotion/styled";
import React, { useCallback, useEffect, useRef } from "react";
import { ChekiCanvasTrim } from "./CanvasTrim";
import { ChekiTrimFocus } from "./TrimFocus";
import { ChekiTrimGrid } from "./TrimGrid";
import { ChekiTrimImageOperator } from "./TrimImageOperator";
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

  const handleOnClickUnfocus = useCallback(
    () => dispatch(actions.focus(null)),
    []
  );

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
        onClick={handleOnClickUnfocus}
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
        <ChekiTrimFocus />
        <ChekiTrimImageOperator />
      </Canvas>
    </Container>
  );
};
