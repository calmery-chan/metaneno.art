import { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as ReactThreeFiber from "react-three-fiber";
import { useFrame, useThree } from "react-three-fiber";
import useSWR from "swr";
import { Box3, Scene, Vector3 } from "three";
import GLTFLoader from "three-gltf-loader";
import axios from "~/utils/axios";
import CameraControls from 'camera-controls';
import * as THREE from 'three';

CameraControls.install({ THREE })

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

const Exhibition3dPlayer: React.FC = () => {
  const [up, setUp] = useState(false);
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);

  // Refs

  const ref = useRef<any>();

  // Events

  const handleKeyDown = useCallback(({ keyCode }: KeyboardEvent) => {
    if (keyCode === 87 || keyCode === 38) setUp(true);
    if (keyCode === 83 || keyCode === 40) setDown(true);
    if (keyCode === 65 || keyCode === 37) setLeft(true);
    if (keyCode === 68 || keyCode === 39) setRight(true);
  }, []);

  const handleKeyUp = useCallback(({ keyCode }: KeyboardEvent) => {
    if (keyCode === 87 || keyCode === 38) setUp(false);
    if (keyCode === 83 || keyCode === 40) setDown(false);
    if (keyCode === 65 || keyCode === 37) setLeft(false);
    if (keyCode === 68 || keyCode === 39) setRight(false);
  }, []);

  // Side Effects

  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    addEventListener("keyup", handleKeyUp);

    return () => {
      removeEventListener("keydown", handleKeyDown);
      removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // useFrame((state, delta) => {
  //   const position = ref.current!.position as Vector3;

  //   let nextX = 0;
  //   let nextZ = 0;

  //   if (up || left) nextX += EXHIBITION_3D_PLAYER_MOVING_DISTANCE * delta;
  //   if (down || right) nextX -= EXHIBITION_3D_PLAYER_MOVING_DISTANCE * delta;
  //   if (up || right) nextZ += EXHIBITION_3D_PLAYER_MOVING_DISTANCE * delta;
  //   if (down || left) nextZ -= EXHIBITION_3D_PLAYER_MOVING_DISTANCE * delta;

  //   position.x += nextX;
  //   position.z += nextZ;

  //   state.camera.position.x = position.x + 2;
  //   state.camera.position.y = position.y + 2;
  //   state.camera.position.z = position.z;
  //   state.camera.lookAt(new Vector3(position.x, position.y + 1, position.z));
  //   state.camera.updateProjectionMatrix();
  // });

  // Render

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[1, 1, 1]} />
      <meshToonMaterial attach="material" color={"#000"} />
    </mesh>
  );
};

// Main

const Exhibition3dCamera: React.FC = () => {
  const { gl, camera } = useThree();
  const [clock, setClock] = useState<THREE.Clock>();
  const [cameraControls, setCameraControls] = useState<CameraControls>();

  useEffect(() => {
    setClock(new THREE.Clock());
  }, []);

  useEffect(() => {
    const cameraControls = new CameraControls(camera, gl.domElement);

    cameraControls.minDistance = 3;
    cameraControls.maxDistance = 10;
    cameraControls.minPolarAngle =  50 * (Math.PI / 180);
    cameraControls.maxPolarAngle = 50 * (Math.PI / 180);
    cameraControls.boundaryFriction = 0.1;

    setCameraControls(cameraControls);
  }, [camera, gl.domElement])

  useFrame(() => {
    if (!clock || !cameraControls) {
      return;
    }

    cameraControls.update(clock.getDelta());
  })

  return null;
}

const ExhibitionIndex: NextPage = () => {
  const [area] = useState<Area>("meadow");
  const { objects } = useObjects(area);

  // Render

  if (!objects) {
    return null;
  }

  return (
    <Exhibition3dCanvas>
      <Exhibition3dCamera />
      <Exhibition3dCanvasDebugger />
      <Exhibition3dCanvasObjects objects={objects} />
      <Exhibition3dDirectionalLight />
      <Exhibition3dPlayer />
    </Exhibition3dCanvas>
  );
};

export default ExhibitionIndex;
