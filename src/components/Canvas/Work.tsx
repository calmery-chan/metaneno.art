import React, { useState, useEffect } from "react";
import { Vector3, Box3, Scene } from "three";
import { Work as WorkType } from "~/types/contentful";
import GLTFLoader from "three-gltf-loader";

export const Work: React.FC<WorkType> = ({ model }) => {
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(model.url, (gltf) => setScene(gltf.scene));
  }, [model.url]);

  useEffect(() => {
    if (!scene) {
      return;
    }

    scene.position.x = model.position_x;
    scene.position.y = model.position_y;
    scene.position.z = model.position_z;
    scene.rotateX(model.rotate_x);
    scene.rotateY(model.rotate_y);
    scene.rotateZ(model.rotate_z);
    scene.scale.x = model.scale_x;
    scene.scale.y = model.scale_y;
    scene.scale.z = model.scale_z;

    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    scene.position.y += size.y / 2;
  }, [scene]);

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
};
