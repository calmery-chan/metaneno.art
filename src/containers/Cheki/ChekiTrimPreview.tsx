import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { ChekiTrimImage } from "./TrimImage";
import { useDispatch, useSelector, selectors } from "~/domains";
import { actions } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

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
  const dispatch = useDispatch();
  const { layout } = useSelector(selectors.cheki);

  // Events

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

  const containerRef = useDisplayable<HTMLDivElement>(
    handleOnUpdateDisplayable
  );

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
