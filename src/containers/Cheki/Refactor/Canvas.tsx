import { css, Interpolation, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

// Styles

const canvas = css`
  position: absolute;
`;

const Container = styled.div`
  flex-grow: 1;
  height: fit-content;
`;

// Components

export const ChekiCanvas: React.FC<{ emotion?: Interpolation<Theme> }> = ({
  children,
  emotion,
}) => {
  const dispatch = useDispatch();
  const { height, width } = useSelector(selectors.displayable);

  // Events

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

  // Refs

  const ref = useDisplayable<HTMLDivElement>(handleOnUpdateDisplayable);

  // Render

  return (
    <Container css={emotion} ref={ref}>
      <svg
        css={canvas}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        {children}
      </svg>
    </Container>
  );
};
