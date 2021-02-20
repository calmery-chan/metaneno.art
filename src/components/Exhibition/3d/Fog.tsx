import React, { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { Color, Fog } from "three";

export const Exhibition3dFog = React.memo<{ color: string }>(({ color }) => {
  const { scene } = useThree();

  useEffect(() => {
    scene.fog = new Fog(new Color(color), 1.5, 20);
  }, [color, scene]);

  return null;
});
