import React, { useEffect } from "react";
import {
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
} from "~/constants/cheki";
import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { getFrameSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasLayerFrameImage: React.FC = () => {
  const dispatch = useDispatch();
  const frameDataUrl = useSelector(selectors.frameDataUrl);
  const frameReady = useSelector(selectors.frameReady);
  const imageDirection = useSelector(selectors.imageDirection);
  const { height, width } = getFrameSizeByDirection(imageDirection);

  // Side Effects

  useEffect(() => {
    if (!frameReady) dispatch(actions.changeFrame({ index: 0 }));
  }, [frameReady]);

  // Render

  return (
    <>
      <mask id="cheki-bordered-frame">
        <rect height={height} width={width} fill="white" rx="8" />
      </mask>

      <image
        height={CHEKI_VERTICAL_FRAME_HEIGHT}
        mask="url(#cheki-bordered-frame)"
        width={CHEKI_HORIZONTAL_FRAME_WIDTH}
        xlinkHref={frameDataUrl}
      />
    </>
  );
};
