import platform from "platform";
import React from "react";
import { ChekiCanvasTrimedImage } from "./CanvasTrimedImage";
import { ChekiFilter, CHEKI_THUMBNAIL_IMAGE_SIZE } from "~/constants/cheki";
import { selectors, useSelector } from "~/domains";

type ChekiFilterThumbnailProps = {
  filter: ChekiFilter | null;
};

export const ChekiFilterThumbnail: React.FC<ChekiFilterThumbnailProps> = ({
  filter,
}) => {
  const {
    layout: { trim },
  } = useSelector(selectors.cheki);

  const isFirefox = !!platform.name && platform.name === "Firefox";

  return (
    <svg
      height={CHEKI_THUMBNAIL_IMAGE_SIZE / 2}
      viewBox={`0 0 ${trim.width} ${trim.height}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <ChekiCanvasTrimedImage noImage={isFirefox} filter={filter} />
    </svg>
  );
};
