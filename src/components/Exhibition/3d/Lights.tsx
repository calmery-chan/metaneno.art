import React from "react";
import { Color, Vector3 } from "three";
import { Light } from "~/types/exhibition";

export const Exhibition3dLights = React.memo<{
  directional: Light;
  points: Light[];
}>(({ directional, points }) => (
  <>
    <directionalLight
      color={new Color(directional.color)}
      position={
        new Vector3(
          directional.position.x,
          directional.position.y,
          directional.position.z
        )
      }
    />
    {points.map((point, key) => (
      <pointLight
        color={new Color(point.color)}
        key={key}
        position={
          new Vector3(point.position.x, point.position.y, point.position.z)
        }
      />
    ))}
  </>
));
