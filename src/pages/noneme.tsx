import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd"; // eslint-disable-line import/no-unresolved
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import {
  convertFileToImage,
  convertImageToBlobUrl,
  resizeImage,
} from "~/utils/instax";

const Noneme: NextPage = () => {
  const [detectedObject, setDetectedObject] = useState<
    cocoSsd.DetectedObject[]
  >([]);
  const [imageUrl, setImageUrl] = useState<string>();
  const [model, setModel] = useState<cocoSsd.ObjectDetection>();

  useEffect(() => {
    (async () => {
      setModel(await cocoSsd.load());
    })();
  }, []);

  const handleOnChangeFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (!files || !files.length || !model) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const image = await resizeImage(await convertFileToImage(files[0]))!;

      setImageUrl(await convertImageToBlobUrl(image));
      setDetectedObject(await model.detect(image));
    },
    [model]
  );

  if (!model) {
    return null;
  }

  console.log(detectedObject);

  return (
    <>
      <input
        accept="image/jpeg,image/png"
        onChange={handleOnChangeFile}
        type="file"
      />
      {imageUrl && <img src={imageUrl} />}
    </>
  );
};

export default Noneme;
