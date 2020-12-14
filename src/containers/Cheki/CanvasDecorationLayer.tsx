import React from "react";
import { CHEKI_DECORATIONS } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

export const ChekiCanvasDecorationLayer: React.FC = () => {
  const { decorations: decorationIds } = useSelector(selectors.cheki);
  const decorations = decorationIds.map(
    (decorationId) =>
      CHEKI_DECORATIONS[
        CHEKI_DECORATIONS.findIndex(({ id }) => decorationId === id)
      ]!
  );

  return (
    <>
      {decorations.map(({ layers }) =>
        layers.map(({ height, rotate, url, width, x, y }, key) => (
          <image
            key={key}
            transform={`rotate(${rotate}, ${width / 2}, ${height / 2})`}
            x={x}
            xlinkHref={url}
            y={y}
          />
        ))
      )}
    </>
  );
};
