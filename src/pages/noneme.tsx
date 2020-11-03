import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { Instax } from "~/components/Instax";
import {
  convertFileToImage,
  convertImageToBlobUrl,
  resizeImage,
} from "~/utils/instax";

const Noneme: NextPage = () => {
  const [imageUrl, setImageUrl] = useState<string>();

  const handleOnChangeFile = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;

      if (!files || !files.length) {
        return;
      }

      setImageUrl(
        await convertImageToBlobUrl(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await resizeImage(await convertFileToImage(files[0]))!
        )
      );
    },
    []
  );

  return (
    <>
      <input
        accept="image/jpeg,image/png"
        onChange={handleOnChangeFile}
        type="file"
      />
      {imageUrl && (
        <div className="container">
          <Instax imageUrl={imageUrl} />
        </div>
      )}
    </>
  );
};

export default Noneme;
