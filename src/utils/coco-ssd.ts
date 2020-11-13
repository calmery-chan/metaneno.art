import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd"; // eslint-disable-line import/no-unresolved
import { DetectedObject, ObjectDetection } from "@tensorflow-models/coco-ssd"; // eslint-disable-line import/no-unresolved

let model: ObjectDetection | null = null;

export const detect = async (
  image: HTMLImageElement
): Promise<DetectedObject[]> => {
  if (!model) {
    model = await cocoSsd.load();
  }

  return await model.detect(image);
};

export type { DetectedObject };
