import React, { useState } from "react";
import * as ReactThreeFiber from "react-three-fiber";

const Player: React.FC = () => {
  const [positionX, setPositionX] = useState(0);
  const [positionY, setPositionY] = useState(0);

  return (
    <mesh>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshToonMaterial attach="material" color={"#000"} />
    </mesh>
  );
};

const Controller: React.FC = () => {
  return <Player />;
};

export const Renderer: React.FC = () => {
  return (
    <ReactThreeFiber.Canvas>
      <Controller />
    </ReactThreeFiber.Canvas>
  );
};
