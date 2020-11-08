import React from "react";
import {
  ChekiFilter,
  CHEKI_FILTERS,
  CHEKI_THUMBNAIL_IMAGE_SIZE,
} from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

type ChekiFilterThumbnailProps = {
  filter: ChekiFilter;
};

export const ChekiFilterThumbnail: React.FC<ChekiFilterThumbnailProps> = ({
  filter,
}) => {
  const { image } = useSelector(selectors.cheki);
  const { thumbnailUrl } = image;

  const { a, b, g, r } = CHEKI_FILTERS[filter];
  const factor = 1 - a;

  return (
    <svg
      height={CHEKI_THUMBNAIL_IMAGE_SIZE}
      viewBox={`0 0 ${CHEKI_THUMBNAIL_IMAGE_SIZE} ${CHEKI_THUMBNAIL_IMAGE_SIZE}`}
      width={CHEKI_THUMBNAIL_IMAGE_SIZE}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <filter
          id={`cheki-filter-thumbnail-${filter}`}
          colorInterpolationFilters="sRGB"
        >
          <feColorMatrix
            in="SourceGraphic"
            type="matrix"
            values={[
              [factor, 0, 0, 0, 0],
              [0, factor, 0, 0, 0],
              [0, 0, factor, 0, 0],
              [0, 0, 0, 1, 0],
            ].join(" ")}
          />
          <feComponentTransfer>
            <feFuncB type="linear" slope="1" intercept={a * (b / 255)} />
            <feFuncG type="linear" slope="1" intercept={a * (g / 255)} />
            <feFuncR type="linear" slope="1" intercept={a * (r / 255)} />
          </feComponentTransfer>
        </filter>
      </defs>
      <image
        xlinkHref={thumbnailUrl}
        filter={`url(#cheki-filter-thumbnail-${filter})`}
      />
    </svg>
  );
};
