import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-orbitcontrols-ts";
import * as uuid from "uuid";
import { withBasicAuth } from "~/utils/with-basic-auth";

type PlayerPositionActions =
  | {
      type: "subscribed" | "unsubscribed";
      payload: { id: string };
    }
  | {
      type: "update";
      payload: {
        id: string;
        x: number;
        y: number;
        z: number;
      };
    };

// Constants

const WIDTH = 700;
const HEIGHT = 700;

// Types

type PlayerPosition = {
  id: string;
  x: number;
  y: number;
  z: number;
};

// Three.js

const setupCanvas = (
  element: HTMLDivElement,
  updatePlayerPosition: (x: number, y: number, z: number) => void
) => {
  const keys = { w: false, a: false, s: false, d: false };
  const previousPosition = { x: 0, y: 0, z: 0 };
  const spheres: {
    [key: string]: THREE.Mesh<THREE.SphereGeometry, THREE.MeshNormalMaterial>;
  } = {};

  // Events

  const handleOnKeydown = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 87 || keyCode === 38) keys.w = true;
    if (keyCode === 65 || keyCode === 37) keys.a = true;
    if (keyCode === 83 || keyCode === 40) keys.s = true;
    if (keyCode === 68 || keyCode === 39) keys.d = true;
  };

  const handleOnKeyup = ({ keyCode }: KeyboardEvent) => {
    if (keyCode === 87 || keyCode === 38) keys.w = false;
    if (keyCode === 65 || keyCode === 37) keys.a = false;
    if (keyCode === 83 || keyCode === 40) keys.s = false;
    if (keyCode === 68 || keyCode === 39) keys.d = false;
  };

  addEventListener("keydown", handleOnKeydown, false);
  addEventListener("keyup", handleOnKeyup, false);

  // Main

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);

  const camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.1, 200);
  camera.position.copy(new THREE.Vector3(1, 1, 1));

  const orbitControls = new OrbitControls(camera, element);
  orbitControls.enabled = false;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Animation

  const animation = () => {
    requestAnimationFrame(animation);

    if (keys.w) {
      cube.position.x -= 0.01;
      cube.position.z -= 0.01;
    }

    if (keys.s) {
      cube.position.x += 0.01;
      cube.position.z += 0.01;
    }

    if (keys.a) {
      cube.position.x -= 0.01;
      cube.position.z += 0.01;
    }

    if (keys.d) {
      cube.position.x += 0.01;
      cube.position.z -= 0.01;
    }

    if (
      previousPosition.x !== cube.position.x ||
      previousPosition.y !== cube.position.y ||
      previousPosition.z !== cube.position.z
    ) {
      updatePlayerPosition(cube.position.x, cube.position.y, cube.position.z);
      previousPosition.x = cube.position.x;
      previousPosition.y = cube.position.y;
      previousPosition.z = cube.position.z;
    }

    renderer.render(scene, camera);
  };

  animation();

  // DOM

  element.appendChild(renderer.domElement);

  const subscribed = (id: string) => {
    const geometry = new THREE.SphereGeometry(0.075);
    const material = new THREE.MeshNormalMaterial();
    spheres[id] = new THREE.Mesh(geometry, material);
    spheres[id].position.x = 0;
    spheres[id].position.y = 0;
    spheres[id].position.z = 0;
    scene.add(spheres[id]);
    updatePlayerPosition(cube.position.x, cube.position.y, cube.position.z);
  };

  const update = ({ id, x, y, z }: PlayerPosition) => {
    if (!spheres[id]) {
      const geometry = new THREE.SphereGeometry(0.075);
      const material = new THREE.MeshNormalMaterial();
      spheres[id] = new THREE.Mesh(geometry, material);
      scene.add(spheres[id]);
    }

    spheres[id].position.x = x;
    spheres[id].position.y = y;
    spheres[id].position.z = z;
  };

  const unsubscribed = (id: string) => {
    scene.remove(spheres[id]);
  };

  return [subscribed, update, unsubscribed] as const;
};

const Multiplayer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [id] = useState(uuid.v4());

  useEffect(() => {
    (async () => {
      // Action Cable

      const actioncable = await import("actioncable");
      const consumer = actioncable.createConsumer(
        process.env.NODE_ENV === "production"
          ? "https://metaneno.herokuapp.com/cable"
          : "http://localhost:5000/cable"
      );

      let subscribed: ((id: string) => void) | undefined;

      let update: ((playerLocation: PlayerPosition) => void) | undefined;

      let unsubscribed: ((id: string) => void) | undefined;

      const channel = consumer.subscriptions.create(
        {
          channel: "PlayerPositionChannel",
          id,
        },
        {
          connected() {
            [subscribed, update, unsubscribed] = setupCanvas(
              ref.current!,
              (x, y, z) => channel.send({ id, x, y, z })
            );
          },
          received(data: PlayerPositionActions) {
            if (data.payload.id === id) {
              return;
            }

            switch (data.type) {
              case "subscribed":
                subscribed?.(data.payload.id);
                break;

              case "update":
                update?.(data.payload);
                break;

              case "unsubscribed":
                unsubscribed?.(data.payload.id);
                break;
            }
          },
        }
      );
    })();
  }, []);

  return <div ref={ref} />;
};

export default Multiplayer;
export const getServerSideProps = withBasicAuth();
