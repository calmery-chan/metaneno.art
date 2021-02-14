import React from "react";
import { Vector3 } from "three";

export const Exhibition3dLights = React.memo(() => (
  <>
    <directionalLight color="#AEF3FF" intensity={1.4} />
    <pointLight position={new Vector3(10, 0, 0)} />
  </>
));
