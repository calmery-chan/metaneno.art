import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const { isImageDragging, isImageRotating, isImageScaling } = cheki;

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

  /* --- Events ---*/

  const handleOnUpdateDisplayable = useCallback(
    () =>
      setDisplayable(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        containerRef.current!.getBoundingClientRect()
      ),
    [containerRef]
  );

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

  const { height, width } = displayable;

  return (
    <Container ref={containerRef}>
      <Svg
        height={height}
        onMouseLeave={handleOnComplete}
        onMouseMove={handleOnTick}
        onMouseUp={handleOnComplete}
        onTouchEnd={handleOnComplete}
        // `{ passive: false }` を渡すことができないため `useEffect` 内で登録する
        // onTouchMove={handleOnTick}
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <rect fill="#000" width="100%" height="100%" />
      </Svg>
    </Container>
  );
};
