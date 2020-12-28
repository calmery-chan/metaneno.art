import React from "react";
import { ChekiCanvasImage } from "~/containers/Cheki/CanvasImage";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";

export const ChekiCanvasTrimedImage: React.FC<{
  visible?: boolean;
}> = ({ visible }) => {
  const displayable = useSelector(selectors.displayable);
  const filter = useSelector(selectors.imageFilter);
  const trim = useSelector(selectors.trim);

  return (
    <svg
      height={trim.height}
      overflow={visible ? "visible" : "hidden"}
      viewBox={`0 0 ${trim.viewBoxWidth} ${trim.viewBoxHeight}`}
      width={trim.width}
      x={trim.x - displayable.x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={trim.y - displayable.y}
    >
      <ChekiCanvasImage filter={filter} />
    </svg>
  );
};
