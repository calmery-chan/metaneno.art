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
    frame: { ready, url },
    image: { direction },
  } = useSelector(selectors.cheki);
  const { height, width } = getFrameSizeByDirection(direction);

  // Dummy
  useEffect(() => {
    if (!ready) {
      dispatch(actions.addFrame({ index: 0 }));
    }
  }, [ready]);

  return (
    <>
      <mask id="cheki-canvas-frame-layer">
        <rect fill="#fff" height={height} width={width} />
      </mask>

      <defs>
        <linearGradient
          id="cheki-frame-layer-shadow"
          x1="0"
          y1="0"
          x2="512"
          y2="575"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="1" stopColor="#F5F5F5" />
        </linearGradient>
      </defs>

      {url && (
        <image
          height={CHEKI_VERTICAL_FRAME_HEIGHT}
          width={CHEKI_HORIZONTAL_FRAME_WIDTH}
          xlinkHref={url}
          mask="url(#cheki-canvas-frame-layer)"
        />
      )}

      <rect
        fillOpacity="0.24"
        height={CHEKI_VERTICAL_FRAME_HEIGHT}
        width={CHEKI_HORIZONTAL_FRAME_WIDTH}
        fill="url(#cheki-frame-layer-shadow)"
      />
    </>
  );
};
