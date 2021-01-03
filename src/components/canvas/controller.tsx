import React, { useState } from "react";
import { Cube } from "./cube";

export const Controller: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);

  return <Cube x={positionX} y={positionY} z={positionZ} />;
};
