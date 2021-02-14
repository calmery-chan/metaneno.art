import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import * as ReactThreeFiber from "react-three-fiber";
import useSWR from "swr";
import { Box3, Scene, Vector3 } from "three";
import GLTFLoader from "three-gltf-loader";
import { Exhibition3dPlayer } from "~/components/Exhibition/3d/Player";
import axios from "~/utils/axios";

// Constants

const EXHIBITION_3D_PLAYER_MOVING_DISTANCE = 4;

// Types

type ApiResponse<T> = {
  data: T;
};

type Area = "clouds" | "meadow";

type Object = {
  file: {
    url: string;
  };
  name: string;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotateX: number;
  rotateY: number;
  rotateZ: number;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
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

const Exhibition3dDirectionalLight = React.memo(() => <directionalLight />);

const Exhibition3dCanvasObject: React.FC<Object> = (props) => {
  const [scene, setScene] = useState<Scene>();

  const {
    file,
    positionX,
    positionY,
    positionZ,
    rotateX,
    rotateY,
    rotateZ,
    scaleX,
    scaleY,
    scaleZ,
  } = props;

  // Side Effects

  useEffect(() => {
    (async () => {
      setScene(await getScene(file.url));
    })();
  }, [file.url]);

  useEffect(() => {
    if (!scene) {
      return;
    }

    scene.position.x = positionX;
    scene.position.y = positionY;
    scene.position.z = positionZ;
    scene.rotateX(rotateX);
    scene.rotateY(rotateY);
    scene.rotateZ(rotateZ);
    scene.scale.x = scaleX;
    scene.scale.y = scaleY;
    scene.scale.z = scaleZ;

    scene.position.y +=
      new Box3().setFromObject(scene).getSize(new Vector3()).y / 2;
  }, [
    positionX,
    positionX,
    positionZ,
    rotateX,
    rotateY,
    rotateZ,
    scene,
    scaleX,
    scaleY,
    scaleZ,
  ]);

  if (!scene) {
    return null;
  }

  return <primitive object={scene} />;
};

const Exhibition3dCanvasObjects: React.FC<{ objects: Object[] }> = ({
  objects,
}) => (
  <>
    {objects.map((object) => (
      <Exhibition3dCanvasObject key={object.name} {...object} />
    ))}
  </>
);

const ExhibitionIndex: NextPage = () => {
  const [area] = useState<Area>("meadow");
  // const { objects } = useObjects(area);

  // Render

  // if (!objects) {
  //   return null;
  // }

  return (
    <Exhibition3dCanvas>
      <Exhibition3dCanvasDebugger />
      {/* <Exhibition3dCanvasObjects objects={objects} /> */}
      <Exhibition3dDirectionalLight />
      <Exhibition3dPlayer state="standing" />
    </Exhibition3dCanvas>
  );
};

export default ExhibitionIndex;
