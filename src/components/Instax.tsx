import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd"; // eslint-disable-line import/no-unresolved
import React, { useEffect, useState } from "react";
import { InstaxCharacter } from "./InstaxCharacter";
import { InstaxImage } from "~/components/InstaxImage";
import { InstaxDirection } from "~/types/InstaxDirection";
import { convertUrlToImage } from "~/utils/instax";

const INSTAX_MARGIN_BOTTOM = 352;
const INSTAX_MARGIN_LEFT = 96;
const INSTAX_MARGIN_RIGHT = 96;
const INSTAX_MARGIN_TOP = 128;

type InstaxProps = {
  imageUrl: string;
  direction?: InstaxDirection;
  frameColor?: string;
};

export const Instax: React.FC<InstaxProps> = ({
  imageUrl,
  direction,
  frameColor,
}) => {
  const [detectedObjects, setDetectedObjects] = useState<
    cocoSsd.DetectedObject[]
  >([]);
  const [imageHeight, setImageHeight] = useState<number>();
  const [imageWidth, setImageWidth] = useState<number>();
  const [model, setModel] = useState<cocoSsd.ObjectDetection>();

  useEffect(() => {
    (async () => {
      setModel(await cocoSsd.load());
    })();
  }, []);

  useEffect(() => {
    if (!model) {
      return;
    }

    (async () => {
      const image = await convertUrlToImage(imageUrl);

      setDetectedObjects(await model.detect(image));
      setImageHeight(image.height);
      setImageWidth(image.width);
    })();
  }, [imageUrl, model]);

  if (!imageHeight || !imageWidth || !model) {
    return null;
  }

  const height = direction === "horizontal" ? 1200 : 900;
  const width = direction === "horizontal" ? 900 : 1200;
  const heightIncludingMargins =
    INSTAX_MARGIN_TOP + height + INSTAX_MARGIN_BOTTOM;
  const widthIncludingMargins =
    INSTAX_MARGIN_LEFT + width + INSTAX_MARGIN_RIGHT;

  return (
    <svg
      height={heightIncludingMargins}
      width={widthIncludingMargins}
      viewBox={`0 0 ${widthIncludingMargins} ${heightIncludingMargins}`}
    >
      <rect fill={frameColor || "#000"} height="100%" width="100%" />
      <InstaxImage
        direction={"horizontal"}
        url={imageUrl}
        width={imageWidth}
        height={imageHeight}
        x={INSTAX_MARGIN_LEFT}
        y={INSTAX_MARGIN_TOP}
      />
      {detectedObjects.map(({ bbox, score }, index) => {
        return (
          <rect
            fill="red"
            height={bbox[3]}
            key={index}
            width={bbox[2]}
            x={bbox[0] + INSTAX_MARGIN_LEFT}
            y={bbox[1] + INSTAX_MARGIN_TOP}
          />
        );
      })}
      <InstaxCharacter
        height={height}
        objects={detectedObjects}
        width={width}
        x={INSTAX_MARGIN_LEFT}
        y={INSTAX_MARGIN_TOP}
      />
    </svg>
  );
};
