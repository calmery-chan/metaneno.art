import React from "react";
import { CHEKI_DECORATIONS } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasDecorationLayer: React.FC = () => {
  const { decoration } = useSelector(selectors.cheki);

  if (decoration === null) {
    return null;
  }

  const { layers } = CHEKI_DECORATIONS[decoration];

  return (
    <>
      {layers.map(({ height, rotate, url, width, x, y }, key) => (
        <image
          key={key}
          transform={`rotate(${rotate}, ${width / 2}, ${height / 2})`}
          x={x}
          xlinkHref={url}
          y={y}
        />
      ))}
    </>
  );
};
