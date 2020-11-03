import { DetectedObject } from "@tensorflow-models/coco-ssd"; // eslint-disable-line import/no-unresolved
import React from "react";

const INSTAX_CHARACTER_WIDTH = 370;
const INSTAX_CHARACTER_HEIGHT = 370;

const getCharacterPosition = (
  width: number,
  height: number,
  objects: DetectedObject[]
) => {
  const minX = INSTAX_CHARACTER_WIDTH / 2;
  const maxX = width - INSTAX_CHARACTER_WIDTH / 2;
  const minY = INSTAX_CHARACTER_HEIGHT / 2;
  const maxY = height - INSTAX_CHARACTER_HEIGHT / 2;

  const points = [];

  for (let i = minX; i < maxX; i += 200) {
    for (let j = minY; j < maxY; j += 200) {
      points.push({ x: i, y: j });
    }
  }

  let allowedPoints = points.filter(({ x, y }) => {
    return objects.every(({ bbox }) => {
      const [boxX, boxY, boxWidth, boxHeight] = bbox;

      return !(
        boxX <= x &&
        x <= boxX + boxWidth &&
        boxY <= y &&
        y <= boxY + boxHeight
      );
    });
  });

  if (allowedPoints.length === 0) {
    allowedPoints = points;
  }

  return allowedPoints[Math.floor(Math.random() * allowedPoints.length)];
};

type InstaxCharacterProps = {
  height: number;
  objects: DetectedObject[];
  width: number;
  x: number;
  y: number;
};

export const InstaxCharacter: React.FC<InstaxCharacterProps> = ({
  height,
  objects,
  width,
  x,
  y,
}) => {
  const position = getCharacterPosition(width, height, objects);

  return (
    <svg
      height={height}
      width={width}
      version="1.1"
      viewBox={`0 0 ${width} ${height}`}
      x={x}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      y={y}
    >
      <image
        height="370"
        href="https://camera.calmery.moe/images/stickers/3/2.png"
        width="370"
        transform={`rotate(-${Math.floor(Math.random() * 35)}, ${
          position.x + 370 / 2
        }, ${position.y + 370 / 2})`}
        {...position}
      />
    </svg>
  );
};
