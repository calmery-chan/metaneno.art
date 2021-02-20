import React from "react";
import { Canvas } from "react-three-fiber";

export const Exhibition3dCanvas = React.memo(({ children }) => (
  <Canvas>{children}</Canvas>
));
