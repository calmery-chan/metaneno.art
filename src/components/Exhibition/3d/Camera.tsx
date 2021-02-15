import CameraControls from "camera-controls";
import React, { useEffect, useState } from "react";
import { useFrame, useThree } from "react-three-fiber";
import * as THREE from "three";
import { Vector3 } from "three";

CameraControls.install({ THREE });

export const Exhibition3dCamera = React.memo<{
  offset?: Vector3;
  position?: Vector3;
}>(({ offset = new Vector3(0, 0, 0), position = new Vector3(0, 0, 0) }) => {
  const [cameraControls, setCameraControls] = useState<CameraControls>();
  const { camera, gl } = useThree();

  useEffect(() => {
    const cameraControls = new CameraControls(camera, gl.domElement);

    cameraControls.distance = 2;
    cameraControls.maxDistance = 4;
    cameraControls.minDistance = 1;

    setCameraControls(cameraControls);
  }, [camera, gl.domElement]);

  useFrame((_, delta) => {
    if (cameraControls) {
      cameraControls.moveTo(
        position.x + offset.x,
        position.y + offset.y,
        position.z + offset.z,
        false
      );

      cameraControls.update(delta);
    }
  });

  return null;
});
