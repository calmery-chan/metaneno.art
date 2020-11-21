import { Theme } from "@emotion/react";
import styled, { Interpolation } from "@emotion/styled";
import React, { useCallback } from "react";
import { useDispatch } from "~/domains";
import { actions } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

export const ChekiCanvasContainer: React.FC<{
  emotion?: Interpolation<Theme>;
}> = ({ children, emotion }) => {
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
    <Container css={emotion} ref={containerRef}>
      {children}
    </Container>
  );
};
