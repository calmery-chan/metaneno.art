import React, { useState, useEffect } from "react";
import { Vector3, Box3, Scene } from "three";
import GLTFLoader from "three-gltf-loader";
import { Work as WorkType, Works as WorksType } from "~/types/contentful";

const Work: React.FC<WorkType> = (props: any) => {
  const [scene, setScene] = useState<Scene>();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(props.file.url, (gltf) => setScene(gltf.scene));
  }, [props.file.url]);

  useEffect(() => {
    if (!scene) {
      return;
    }

    scene.position.x = props.positionX;
    scene.position.y = 0; // props.position_y;
    scene.position.z = props.positionZ;
    scene.rotateX(props.rotateX);
    scene.rotateY(props.rotateY);
    scene.rotateZ(props.rotateZ);
    scene.scale.x = props.scaleX;
    scene.scale.y = props.scaleY;
    scene.scale.z = props.scaleZ;

    console.log(scene.position.x, scene.position.y, scene.position.z);

    const box = new Box3().setFromObject(scene);
    const size = box.getSize(new Vector3());
    scene.position.y += size.y / 2;
  }, [scene]);

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
};

export const Works: React.FC<{ works: WorksType }> = ({ works }) => (
  <>
    {works.map((work, key) => (
      <Work key={key} {...work} />
    ))}
  </>
);
