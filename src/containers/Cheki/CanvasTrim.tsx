import React from "react";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import { selectors, useSelector } from "~/domains";

type ChekiTrimImageProps = {
  hidden?: boolean;
};

export const ChekiCanvasTrim: React.FC<ChekiTrimImageProps> = ({
  hidden = false,
}) => {
  const { image, layout } = useSelector(selectors.cheki);
  const { displayable, trim } = layout;

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
      <svg
        height={image.height}
        viewBox={`0 0 ${image.width} ${image.height}`}
        width={image.width}
        x={image.x}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        y={image.y}
      >
        <ChekiFilterImage
          filter={null}
          height={image.height}
          width={image.width}
        />
      </svg>
    </svg>
  );
};
