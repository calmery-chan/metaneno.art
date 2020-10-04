import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { Cube } from "./cube";

const Player: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);
  const [positionZ, setPositionZ] = useState(0);

  return <Cube x={positionX} y={positionY} z={positionZ} />;
};

const Controller: React.FC = () => {
  return <Player />;
};

export const Renderer: React.FC = () => {
  return (
    <Canvas>
      <Controller />
    </Canvas>
  );
};
