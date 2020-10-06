import React from "react";
import * as ReactThreeFiber from "react-three-fiber";
import { Player } from "~/components/canvas/player";

export const Canvas: React.FC = () => {
  return (
    <ReactThreeFiber.Canvas>
      <Player />
    </ReactThreeFiber.Canvas>
  );
};
