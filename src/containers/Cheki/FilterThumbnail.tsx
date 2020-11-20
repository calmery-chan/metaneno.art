import React from "react";
import { ChekiFilterDefs } from "~/components/Cheki/FilterDefs";
import { ChekiFilterImage } from "~/components/Cheki/FilterImage";
import { ChekiFilter, CHEKI_THUMBNAIL_IMAGE_SIZE } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";
type ChekiFilterThumbnailProps = {
  filter: ChekiFilter | null;
};

export const ChekiFilterThumbnail: React.FC<ChekiFilterThumbnailProps> = ({
  filter,
}) => {
  const { image } = useSelector(selectors.cheki);

  return (
    <svg
      height={CHEKI_THUMBNAIL_IMAGE_SIZE / 2}
      viewBox={`0 0 ${image.width} ${image.height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <ChekiFilterDefs />
      <ChekiFilterImage
        filter={filter}
        height={image.height}
        width={image.width}
      />
    </svg>
  );
};
