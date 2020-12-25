import { css } from "@emotion/react";
import { useCallback } from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { useDisplayable } from "~/utils/cheki";

// Styles

const canvas = css`
  position: absolute;
`;

const container = css`
  flex-grow: 1;
  height: fit-content;
`;

// Components

export const ChekiCanvas: React.FC = ({ children }) => {
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
    <div css={container} ref={ref}>
      <svg
        css={canvas}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <ChekiFilterDefs />

        {children}
      </svg>
    </div>
  );
};
