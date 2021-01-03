import React, { useEffect, useRef } from "react";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import { BufferGeometry, Geometry, Material, Mesh, Vector3 } from "three";

export const Cube: React.FC<{ x: number; y: number; z: number }> = ({
  x,
  y,
  z,
}) => {
  const ref = useRef<
    ReactThreeFiber.Object3DNode<
      Mesh<Geometry | BufferGeometry, Material | Material[]>,
      typeof Mesh
    >
  >();

  useEffect(() => {
    if (!ref.current || !ref.current.position) return;

    const position = ref.current.position as Vector3;
    position.x = x;
    position.y = y;
    position.z = z;
  }, [x, y, z]);

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshToonMaterial attach="material" color="#000" />
    </mesh>
  );
};
