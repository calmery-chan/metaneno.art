import React, { useEffect } from "react";
import {
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
} from "~/constants/cheki";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";

export const ChekiCanvasFrameLayer: React.FC = () => {
  const dispatch = useDispatch();
  const {
    frame: { dataUrl, ready },
  } = useSelector(selectors.cheki);

  useEffect(() => {
    if (!ready) {
      dispatch(actions.changeFrame({ index: 0 }));
    }
  }, [ready]);

  return (
    <image
      height={CHEKI_VERTICAL_FRAME_HEIGHT}
      width={CHEKI_HORIZONTAL_FRAME_WIDTH}
      xlinkHref={dataUrl}
    />
  );
};
