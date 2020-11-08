import { css } from "linaria";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiImageLoadButton } from "~/components/ChekiImageLoadButton";
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
  background: red;
  height: fit-content;
  flex-shrink: 0;
`;

// Page

const Cheki: NextPage = () => {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);

  const handleOnLoadImage = useCallback(
    (imageUrl: string) => dispatch(actions.addImage({ url: imageUrl })),
    []
  );

  const handleOnClickDownloadButton = useCallback(() => {
    setPreview(!preview);
  }, [preview]);

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
        <div className={header} />
        <div className={cheki}>
          <ChekiCanvas preview={preview} />
        </div>
        <div className={footer}>
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
          <Horizontal>
            <div
              className={frameImage}
              onClick={() => handleOnClickFilter(null)}
              style={{ background: "#fff" }}
            />
            {Object.keys(CHEKI_FILTERS).map((filter, index) => (
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
          <div onClick={handleOnClickDownloadButton}>Download</div>
        </div>
      </div>
    </div>
  );
};

export default Cheki;
