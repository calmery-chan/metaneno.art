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
    image: { direction },
    frame: { dataUrl, ready },
  } = useSelector(selectors.cheki);

  useEffect(() => {
    if (!ready) {
      dispatch(actions.changeFrame({ index: 0 }));
    }
  }, [ready]);

  const { height, width } = getFrameSizeByDirection(direction);

  return (
    <>
      <mask id="cheki-bordered-frame">
        <rect height={height} width={width} fill="white" rx="8" />
      </mask>

      <image
        height={CHEKI_VERTICAL_FRAME_HEIGHT}
        mask="url(#cheki-bordered-frame)"
        width={CHEKI_HORIZONTAL_FRAME_WIDTH}
        xlinkHref={dataUrl}
      />
    </>
  );
};
