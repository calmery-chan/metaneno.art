import { css } from "linaria";
import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef } from "react";
import { ChekiCanvasFrameLayer } from "./CanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./CanvasImageLayer";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
const Container = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Svg = styled.svg`
  position: absolute;
`;

export const ChekiFramePreview: React.FC = () => {
  const {
    layout: { displayable, frame },
  } = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  /* --- Refs --- */

  const containerRef = useRef<HTMLDivElement>(null);

  /* --- Events ---*/

  const handleOnUpdateDisplayable = useCallback(() => {
    const { current } = containerRef;

    if (!current) {
      return;
    }

    const { height, width, x, y } = current.getBoundingClientRect();
    dispatch(actions.updateDisplayable({ height, width, x, y }));
  }, [containerRef]);

  /* --- Side Effects --- */

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

  /* --- Render --- */

  return (
    <div
      className={css`
        flex-grow: 1;
        height: fit-content;
      `}
    >
      <Container ref={containerRef}>
        <Svg
          height={displayable.height}
          viewBox={`0 0 ${displayable.width} ${displayable.height}`}
          width={displayable.width}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <svg
            height={frame.height}
            viewBox={`0 0 ${frame.viewBoxWidth} ${frame.viewBoxHeight}`}
            width={frame.width}
            x={frame.x - displayable.x}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            y={frame.y - displayable.y}
          >
            <ChekiCanvasFrameLayer />
            <ChekiCanvasImageLayer />
          </svg>
        </Svg>
      </Container>
    </div>
  );
};
