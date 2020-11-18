import { styled } from "linaria/react";
import React, { useCallback } from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
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

export const ChekiFilterPreview: React.FC = () => {
  const cheki = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  // Refs

  const { image, layout } = cheki;
  const { displayable, trim } = layout;

  // Side Effects

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width, x, y }) =>
      dispatch(actions.updateDisplayable({ height, width, x, y })),
    []
  );

  const containerRef = useDisplayable<HTMLDivElement>(
    handleOnUpdateDisplayable
  );

  // Render

  const { filter, height, width, url } = image;

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
          height={trim.height}
          viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
          width={trim.width}
          x={trim.x - displayable.x}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y={trim.y - displayable.y}
        >
          <svg
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            width={width}
            x={image.x}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            y={image.y}
          >
            <ChekiFilterDefs />
            <ChekiFilterImage
              filter={filter}
              height={height}
              href={url}
              width={width}
            />
          </svg>
        </svg>
      </Canvas>
    </Container>
  );
};
