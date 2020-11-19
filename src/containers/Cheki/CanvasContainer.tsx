import styled from "@emotion/styled";
import React, { useCallback } from "react";
import { useDispatch } from "~/domains";
import { actions } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

export const ChekiCanvasContainer: React.FC = ({ children }) => {
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

  return <Container ref={containerRef}>{children}</Container>;
};
