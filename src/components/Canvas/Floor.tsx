import React from "react";
import * as THREE from "three";

const fragmentShader = `
uniform sampler2D tBackground;
varying vec2 vUv;
void main() {
  vec4 backgroundColor = texture2D(tBackground, vUv);
  gl_FragColor = backgroundColor;
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 newPosition = position;
  newPosition.z = 1.0;
  gl_Position = vec4(newPosition, 1.0);
}
`;

export const Floor: React.FC = () => {
  const topLeft = new THREE.Color("#f5883c");
  const topRight = new THREE.Color("#ff9043");
  const bottomRight = new THREE.Color("#fccf92");
  const bottomLeft = new THREE.Color("#f5aa58");

  const data = new Uint8Array([
    Math.round(bottomLeft.r * 255),
    Math.round(bottomLeft.g * 255),
    Math.round(bottomLeft.b * 255),
    Math.round(bottomRight.r * 255),
    Math.round(bottomRight.g * 255),
    Math.round(bottomRight.b * 255),
    Math.round(topLeft.r * 255),
    Math.round(topLeft.g * 255),
    Math.round(topLeft.b * 255),
    Math.round(topRight.r * 255),
    Math.round(topRight.g * 255),
    Math.round(topRight.b * 255),
  ]);

  const backgroundTexture = new THREE.DataTexture(data, 2, 2, THREE.RGBFormat);
  backgroundTexture.magFilter = THREE.LinearFilter;
  backgroundTexture.needsUpdate = true;

  return (
    <mesh>
      <planeBufferGeometry attach="geometry" args={[2, 2, 10, 10]} />
      <shaderMaterial
        attach="material"
        args={[
          {
            wireframe: false,
            transparent: false,
            uniforms: {
              tBackground: { value: backgroundTexture },
            },
            vertexShader,
            fragmentShader,
          },
        ]}
      />
    </mesh>
  );
};
