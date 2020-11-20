import React from "react";
import { selectors, useSelector } from "~/domains";

type ChekiTrimImageProps = {
  hidden?: boolean;
};

export const ChekiCanvasTrim: React.FC<ChekiTrimImageProps> = ({
  hidden = false,
}) => {
  const { character, image, layout } = useSelector(selectors.cheki);
  const { displayable, trim } = layout;

  console.log(character && character.scale);

  return (
    <svg
      height={trim.height}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
      overflow={hidden ? "hidden" : "visible"}
    >
      <image
        height={image.height}
        x={image.x}
        xlinkHref={image.dataUrl}
        width={image.width}
        y={image.y}
      />

      {character && (
        <svg
          height={character.height}
          overflow="visible"
          viewBox={`0 0 ${character.width} ${character.height}`}
          width={character.width}
          x={character.x}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          y={character.y}
        >
          <g
            transform={`rotate(${character.rotate} ${character.width / 2} ${
              character.height / 2
            })`}
          >
            <image
              height={character.height * character.scale}
              width={character.width * character.scale}
              x={
                ((character.width * character.scale - character.width) / 2) * -1
              }
              xlinkHref={character.dataUrl}
              y={
                ((character.height * character.scale - character.height) / 2) *
                -1
              }
            />
          </g>
        </svg>
      )}
    </svg>
  );
};
