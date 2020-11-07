import React from "react";
import {
  CHEKI_HORIZONTAL_FRAME_HEIGHT,
  CHEKI_HORIZONTAL_FRAME_WIDTH,
  CHEKI_VERTICAL_FRAME_HEIGHT,
  CHEKI_VERTICAL_FRAME_WIDTH,
} from "~/constants/cheki";
import { ChekiDirection } from "~/types/ChekiDirection";

const Horizontal: React.FC = () => (
  <rect
    fill="#fff"
    height={CHEKI_HORIZONTAL_FRAME_HEIGHT}
    width={CHEKI_HORIZONTAL_FRAME_WIDTH}
  />
);

const Vertical: React.FC = () => (
  <rect
    fill="#fff"
    height={CHEKI_VERTICAL_FRAME_HEIGHT}
    width={CHEKI_VERTICAL_FRAME_WIDTH}
  />
);

type ChekiCanvasFrameLayerProps = {
  direction: ChekiDirection;
};

export const ChekiCanvasFrameLayer: React.FC<ChekiCanvasFrameLayerProps> = ({
  direction,
}) => {
  switch (direction) {
    case "horizontal":
      return <Horizontal />;

    case "vertical":
      return <Vertical />;
  }
};
