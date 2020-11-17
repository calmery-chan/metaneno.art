import { css } from "linaria";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiImageLoadButton } from "~/components/ChekiImageLoadButton";
import { Controller } from "~/components/Controller";
import { FilterList } from "~/components/FilterList";
import { Header } from "~/components/Header";
import { Horizontal } from "~/components/Horizontal";
import {
  ChekiFilter,
  CHEKI_FILTERS,
  CHEKI_FRAME_IMAGE_URLS,
} from "~/constants/cheki";
import { ChekiCanvas } from "~/containers/ChekiCanvas";
import { ChekiFilterThumbnail } from "~/containers/ChekiFilterThumbnail";
import { useDispatch } from "~/domains";
import { actions } from "~/domains/cheki";
import { upload } from "~/utils/cheki";

// Styles

const cheki = css`
  flex-grow: 1;
  height: fit-content;
`;

const column = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const footer = css`
  height: fit-content;
  flex-shrink: 0;
`;

const frameImage = css`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin-right: 16px;
  cursor: pointer;

  &:first-child {
    margin-left: 24px;
  }

  &:last-child {
    margin-right: 24px;
  }

  svg {
    width: 48px;
    height: 48px;
    border-radius: 100%;
  }
`;

const header = css`
  height: fit-content;
  flex-shrink: 0;
`;

// Page

const Cheki: NextPage = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleOnLoadImage = useCallback(
    (imageUrl: string) => dispatch(actions.addImage({ url: imageUrl })),
    []
  );

  const handleOnClickCreateImageButton = useCallback(() => {
    setPreview(true);
  }, []);

  const handleOnCreatePreviewUrl = useCallback(
    (url: string) => setPreviewUrl(url),
    []
  );

  const handleOnClickDownloadButton = useCallback(async () => {
    if (!previewUrl) {
      return;
    }

    const id = await upload(previewUrl);
    const url = window.location.origin + "/cheki/share/" + id;
    window.location.href = `http://twitter.com/share?url=${url}&related=metanen0x0&hashtags=%E3%82%81%E3%81%9F%E3%81%AD%E3%81%AE%E3%81%82%E3%83%BC%E3%81%A8,%E3%83%8E%E3%83%8D%E3%83%A1%E3%81%A1%E3%82%83%E3%82%93%E3%83%81%E3%82%A7%E3%82%AD`;
  }, [previewUrl]);

  const handleOnClickFrameImage = useCallback(
    (url) => dispatch(actions.addFrame({ url })),
    []
  );

  const handleOnClickFilter = useCallback(
    (filter: ChekiFilter | null) => dispatch(actions.changeFilter({ filter })),
    []
  );

  return (
    <div className="container h-full mx-auto">
      <div className={column}>
        <div className={header}>
          <Header />
        </div>
        <div className={cheki}>
          <ChekiCanvas
            preview={preview}
            onCreatePreviewUrl={handleOnCreatePreviewUrl}
          />
        </div>
        <div className={footer}>
          <Controller active="camera" />
          <Horizontal>
            {CHEKI_FRAME_IMAGE_URLS.map((url, index) => (
              <div
                className={frameImage}
                key={index}
                onClick={() => handleOnClickFrameImage(url)}
                style={{ background: `url(${url})`, backgroundSize: "cover" }}
              />
            ))}
          </Horizontal>
          <FilterList onClick={console.log} />
          <Horizontal>
            <div
              className={frameImage}
              onClick={() => handleOnClickFilter(null)}
            >
              <ChekiFilterThumbnail filter={null} />
            </div>
            {CHEKI_FILTERS.map((filter, index) => (
              <div
                className={frameImage}
                key={index}
                onClick={() => handleOnClickFilter(filter as ChekiFilter)}
              >
                <ChekiFilterThumbnail filter={filter as ChekiFilter} />
              </div>
            ))}
          </Horizontal>
          <ChekiImageLoadButton onLoad={handleOnLoadImage} />
          <button onClick={handleOnClickCreateImageButton}>Create Image</button>
          <button disabled={!previewUrl} onClick={handleOnClickDownloadButton}>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cheki;
