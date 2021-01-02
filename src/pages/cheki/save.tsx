import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNote } from "~/components/Cheki/Note";
import { SAVE_PAGE_SCENARIO, TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasChekiImage } from "~/containers/Cheki/CanvasChekiImage";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { useSelector } from "~/domains";
import { selectors } from "~/domains/cheki";
import { Spacing } from "~/styles/spacing";
import {
  getScenarioCacheId,
  getShareUrlById,
  getTutorialElementId,
  upload,
} from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

// Styles

const preview = css`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const twitter = css`
  display: inline-block;
  height: 14px;
  margin-right: ${Spacing.xs}px;
  vertical-align: top;
`;

// Components

const ChekiSaveAndShare: NextPage = () => {
  const displayable = useSelector(selectors.displayable);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);
  const [isFetching, setFetching] = useState(false);

  // Events

  const handleOnClickShareButton = useCallback(async () => {
    if (!previewUrl) {
      return;
    }

    let nextShareId = shareId;

    if (!nextShareId) {
      setFetching(true);
      setShareId((nextShareId = await upload(previewUrl)));
      setFetching(false);
    }

    GA.share();

    window.location.href = getShareUrlById(nextShareId);
  }, [previewUrl, shareId]);

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader
          forceDisplayOnlyOnce={getScenarioCacheId("save")}
          scenario={SAVE_PAGE_SCENARIO}
        />
        <ChekiCanvas>
          <ChekiCanvasChekiImage onCreatePreviewUrl={setPreviewUrl} />
        </ChekiCanvas>
        <div
          className="absolute w-full"
          id={getTutorialElementId("preview")}
          style={{
            height: `${displayable.height}px`,
            top: `${displayable.y}px`,
          }}
        >
          {previewUrl && <img css={preview} src={previewUrl} />}
        </div>

        <ChekiColumn margin>
          <ChekiNote>
            <ExternalLink href={TWITTER_HASHTAG_URL}>
              <ChekiHashTag>#ノネメちゃんチェキ</ChekiHashTag>
            </ExternalLink>
            を付けてシェアしよう
          </ChekiNote>
          <ChekiButton
            disabled={!previewUrl || isFetching}
            onClick={handleOnClickShareButton}
          >
            {!isFetching && previewUrl && (
              <>
                <img alt="Twitter" css={twitter} src="/cheki/twitter.svg" />
                Twitter にシェアする
              </>
            )}
            {!isFetching && !previewUrl && <>画像の準備中...</>}
            {isFetching && <>シェア用の URL を取得中...</>}
          </ChekiButton>
        </ChekiColumn>
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default ChekiSaveAndShare;
