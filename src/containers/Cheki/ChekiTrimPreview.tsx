import { styled } from "linaria/react";
import React, { useCallback, useEffect, useRef } from "react";
import { ChekiTrimImage } from "./TrimImage";
import { useDispatch, useSelector, selectors } from "~/domains";
import { actions } from "~/domains/cheki";

// Styles

const Canvas = styled.svg`
  position: absolute;
`;

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

// Main

export const ChekiTrimPreview: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { layout } = useSelector(selectors.cheki);

  // Events

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

  const { displayable } = layout;

  return (
    <Container ref={containerRef}>
      <Canvas
        height={displayable.height}
        viewBox={`0 0 ${displayable.width} ${displayable.height}`}
        width={displayable.width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <ChekiTrimImage hidden />
      </Canvas>
    </Container>
  );
};
