import React from "react";
import * as ReactThreeFiber from "react-three-fiber";
import { Controller } from "~/components/canvas/controller";

export const Canvas: React.FC = () => {
  return (
    <ReactThreeFiber.Canvas>
      <Controller />
    </ReactThreeFiber.Canvas>
  );
};
