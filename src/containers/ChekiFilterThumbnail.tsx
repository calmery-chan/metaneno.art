import React from "react";
import { ChekiFilterDefs } from "~/components/ChekiFilterDefs";
import { ChekiFilterImage } from "~/components/ChekiFilterImage";
import { ChekiFilter, CHEKI_THUMBNAIL_IMAGE_SIZE } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

type ChekiFilterThumbnailProps = {
  filter: ChekiFilter | null;
};

export const ChekiFilterThumbnail: React.FC<ChekiFilterThumbnailProps> = ({
  filter,
}) => {
  const { image } = useSelector(selectors.cheki);
  const { thumbnailUrl } = image;

  return (
    <svg
      height={CHEKI_THUMBNAIL_IMAGE_SIZE}
      viewBox={`0 0 ${CHEKI_THUMBNAIL_IMAGE_SIZE} ${CHEKI_THUMBNAIL_IMAGE_SIZE}`}
      width={CHEKI_THUMBNAIL_IMAGE_SIZE}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <ChekiFilterDefs />
      <ChekiFilterImage
        filter={filter}
        height={CHEKI_THUMBNAIL_IMAGE_SIZE}
        href={thumbnailUrl}
        width={CHEKI_THUMBNAIL_IMAGE_SIZE}
      />
    </svg>
  );
};
