/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

export const ChekiCanvasCharacterLayer: React.FC = () => {
  const characterReady = useSelector(selectors.characterReady);
  const imageX = useSelector(selectors.imageX);
  const imageY = useSelector(selectors.imageY);
  const ready = useSelector(selectors.ready);

  if (!characterReady || !ready) {
    return null;
  }

  const characterDataUrl = useSelector(selectors.characterDataUrl)!;
  const characterHeight = useSelector(selectors.characterHeight)!;
  const characterRotate = useSelector(selectors.characterRotate)!;
  const characterScale = useSelector(selectors.characterScale)!;
  const characterWidth = useSelector(selectors.characterWidth)!;
  const characterX = useSelector(selectors.characterX)!;
  const characterY = useSelector(selectors.characterY)!;

  return (
    <svg
      height={characterHeight}
      overflow="visible"
      viewBox={`0 0 ${characterWidth} ${characterHeight}`}
      width={characterWidth}
      x={Math.abs(imageX) + characterX}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={Math.abs(imageY) + characterY}
    >
      <g
        transform={`rotate(${characterRotate} ${characterWidth / 2} ${
          characterHeight / 2
        })`}
      >
        <image
          height={characterHeight * characterScale}
          width={characterWidth * characterScale}
          x={((characterWidth * characterScale - characterWidth) / 2) * -1}
          xlinkHref={characterDataUrl}
          y={((characterHeight * characterScale - characterHeight) / 2) * -1}
        />
      </g>
    </svg>
  );
};
