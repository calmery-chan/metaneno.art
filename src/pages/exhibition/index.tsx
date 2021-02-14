import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import * as ReactThreeFiber from "react-three-fiber";
import useSWR from "swr";
import { Box3, Scene, Vector3 } from "three";
import GLTFLoader from "three-gltf-loader";
import { Exhibition3dPlayer } from "~/components/Exhibition/3d/Player";
import axios from "~/utils/axios";
import json from "~/sea.json";

// Constants

const EXHIBITION_3D_PLAYER_MOVING_DISTANCE = 4;

// Types

type ApiResponse<T> = {
  data: T;
};

type Area = "clouds" | "meadow";

type CanvasObject = {
  url: string;
  transform: {
    position: {
      x: number;
      y: number;
      z: number;
    }
    rotation: {
      x: number;
      y: number;
      z: number;
    }
    scale: {
      x: number;
      y: number;
      z: number;
    }
  }
};

/* Helper Functions */

const noop = () => {};

// Objects

const getObjects = () =>
  axios
    .get<ApiResponse<{ [key in Area]: Object[] }>>("/admin/entries/objects")
    .then(({ data }) => data);

const useObjects = (area: Area) => {
  const { data, error } = useSWR("/admin/entries/objects", getObjects);

  return {
    error,
    objects: data?.data[area],
  };
};

// Scene

const getScene = (url: string): Promise<Scene> =>
  new Promise((resolve, reject) => {
    new GLTFLoader().load(url, (gltf) => resolve(gltf.scene), noop, reject);
  });

/* Components */

const Exhibition3dCanvas: React.FC = ({ children }) => (
  <ReactThreeFiber.Canvas>{children}</ReactThreeFiber.Canvas>
);

const Exhibition3dCanvasDebugger = React.memo(() => (
  <>
    <axesHelper args={[25]} />
    <gridHelper args={[100, 100]} />
  </>
));

const Exhibition3dDirectionalLight = React.memo(() => (
  <>
    <directionalLight color="#AEF3FF" intensity={1.4} />
    <pointLight position={new Vector3(10, 0, 0)} />
  </>
));

const Exhibition3dCanvasObject: React.FC<CanvasObject> = (props) => {
  const [scene, setScene] = useState<Scene>();

  const {
    url,
    transform
  } = props;

  // Side Effects

  useEffect(() => {
    (async () => {
      setScene(await getScene(`${url}.glb`));
    })();
  }, [url]);

  useEffect(() => {
    if (!scene) {
      return;
    }

    const {
      position,
      rotation,
      scale
    } = transform

    scene.position.x = position.x;
    scene.position.y = position.y;
    scene.position.z = position.z;
    scene.rotateX(rotation.x);
    scene.rotateY(rotation.y);
    scene.rotateZ(rotation.z);
    scene.scale.x = scale.x;
    scene.scale.y = scale.y;
    scene.scale.z = scale.z;

    // scene.position.y +=
    //   new Box3().setFromObject(scene).getSize(new Vector3()).y / 2;
  }, [
    scene,
    transform.position,
    transform.rotation,
    transform.scale
  ]);

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
};

const Exhibition3dCanvasObjects: React.FC<{ objects: CanvasObject[] }> = ({
  objects,
}) => (
  <>
    {objects.map((object, index) => (
      <Exhibition3dCanvasObject key={index} {...object} />
    ))}
  </>
);

const ExhibitionIndex: NextPage = () => {
  const [area] = useState<Area>("clouds");

  return (
    <Exhibition3dCanvas>
      <Exhibition3dCanvasDebugger />
      <Exhibition3dCanvasObjects objects={json.objects} />
      <Exhibition3dDirectionalLight />
      <Exhibition3dPlayer state="standing" />
    </Exhibition3dCanvas>
  );
};

export default ExhibitionIndex;
