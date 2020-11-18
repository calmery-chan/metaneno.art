import React, { useEffect } from "react";
import {
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
} from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { getFrameSizeByDirection } from "~/utils/cheki";

export const ChekiCanvasFrameLayer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    frame: { url },
    image: { direction },
  } = useSelector(selectors.cheki);
  const { height, width } = getFrameSizeByDirection(direction);

  // Dummy
  useEffect(() => {
    dispatch(actions.addFrame({ index: 0 }));
  }, []);

  return (
    <>
      <mask id="cheki-canvas-frame-layer">
        <rect fill="#fff" height={height} width={width} />
      </mask>

      {url && (
        <image
          height={CHEKI_VERTICAL_FRAME_HEIGHT}
          width={CHEKI_HORIZONTAL_FRAME_WIDTH}
          xlinkHref={url}
          mask="url(#cheki-canvas-frame-layer)"
        />
      )}
    </>
  );
};
