import React, { useEffect, useState } from "react";

// Vertical

const INSTAX_IMAGE_VERTICAL_HEIGHT = 1200;
const INSTAX_IMAGE_VERTICAL_WIDTH = 900;

type InstaxImageVerticalProps = {
  height: number;
  url: string;
  width: number;
  x: number;
  y: number;
};

export const InstaxImageVertical: React.FC<InstaxImageVerticalProps> = ({
  height,
  url,
  width,
  x,
  y,
}) => {
  const [expansionDirection, setExpansionDirection] = useState<
    "horizontal" | "vertical"
  >();

  useEffect(() => {
    if (
      height < INSTAX_IMAGE_VERTICAL_HEIGHT &&
      width < INSTAX_IMAGE_VERTICAL_WIDTH
    ) {
      // 最小値と比較、より大きく拡大する必要がある辺を基準にする
      if (
        INSTAX_IMAGE_VERTICAL_HEIGHT / height <
        INSTAX_IMAGE_VERTICAL_WIDTH / width
      ) {
        setExpansionDirection("horizontal");
      } else {
        setExpansionDirection("vertical");
      }

      return;
    }

    if (height < INSTAX_IMAGE_VERTICAL_HEIGHT)
      return setExpansionDirection("vertical");

    if (width < INSTAX_IMAGE_VERTICAL_WIDTH)
      return setExpansionDirection("horizontal");

    setExpansionDirection("vertical");
  }, [height, width]);

  if (!expansionDirection) {
    return null;
  }

  return (
    <svg
      height={INSTAX_IMAGE_VERTICAL_HEIGHT}
      width={INSTAX_IMAGE_VERTICAL_WIDTH}
      version="1.1"
      viewBox={`0 0 ${INSTAX_IMAGE_VERTICAL_WIDTH} ${INSTAX_IMAGE_VERTICAL_HEIGHT}`}
      x={x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={y}
    >
      <image
        height={expansionDirection === "vertical" ? "100%" : undefined}
        href={url}
        width={expansionDirection === "horizontal" ? "100%" : undefined}
      />
    </svg>
  );
};
