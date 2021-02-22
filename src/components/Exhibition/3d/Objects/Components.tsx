import React, { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { MathUtils, PlaneGeometry, Vector2 } from "three";
import { Water as Water2 } from "~/externals/Water2";

const Water = React.memo(() => {
  const { scene } = useThree();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const water: any = new Water2(new PlaneGeometry(100, 100), {
      color: "#0D524E",
      flowDirection: new Vector2(1, 1),
      scale: 10,
      textureHeight: 512,
      textureWidth: 512,
    });

    water.position.y = 1.22;
    water.rotation.x = MathUtils.degToRad(-90);
    scene.add(water);

    return () => {
      scene.remove(water);
    };
  }, [scene]);

  return null;
});

export const Exhibition3dObjectsComponents: React.FC<{
  components: string[];
}> = ({ components }) => (
  <>
    {components.map((component) => {
      switch (component) {
        case "water":
          return <Water />;

        default:
          return null;
      }
    })}
  </>
);
