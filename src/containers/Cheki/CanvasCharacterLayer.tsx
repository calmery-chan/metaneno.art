import React from "react";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasCharacterLayer: React.FC = () => {
  const { character, ready } = useSelector(selectors.cheki);

  if (!character || !ready) {
    return null;
  }

  return (
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
      <g transform={undefined}>
        <image
          height={character.height}
          width={character.width}
          // x={((character.width * character.scale - character.width) / 2) * -1}
          xlinkHref={character.dataUrl}
          // y={((character.height * character.scale - character.height) / 2) * -1}
          x={0}
          y={0}
        />
      </g>
    </svg>
  );
};
