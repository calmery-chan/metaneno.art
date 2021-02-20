import React, { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { Color } from "three";

export const Exhibition3dBackground = React.memo<{ color: string }>(({ color }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.background = new Color(color);
  }, [color, scene]);

  return null;
});
