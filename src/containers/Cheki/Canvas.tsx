import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

const Canvas = styled.svg`
  position: absolute;
`;

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

export const ChekiCanvas: React.FC = ({ children }) => {
  const {
    layout: { displayable, frame },
  } = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

  const containerRef = useDisplayable<HTMLDivElement>(
    handleOnUpdateDisplayable
  );

  /* --- Render --- */

  return (
    <Container ref={containerRef}>
      <Canvas
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
          {children}
        </svg>
      </Canvas>
    </Container>
  );
};
