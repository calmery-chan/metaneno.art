import { useFrame } from "react-three-fiber";
import { Vector3 } from "three";

export const Camera: React.FC<{ playerPosition: Vector3 }> = ({
  playerPosition,
}) => {
  useFrame((state) => {
    state.camera.position.x = playerPosition.x - 2;
    state.camera.position.y = playerPosition.y + 4;
    state.camera.position.z = playerPosition.z - 2;
    state.camera.lookAt(playerPosition);
    state.camera.updateProjectionMatrix();
  });

  return null;
};
