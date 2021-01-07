import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiConfetti } from "~/components/Cheki/Confetti";
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
  position: absolute;
  z-index: 1;
`;

const twitter = css`
  display: inline-block;
  height: 14px;
  margin-right: ${Spacing.xs}px;
  vertical-align: top;
`;

// Components

const maskingTape = css`
  height: ${Spacing.l * 3}px;
  position: absolute;
  width: ${Spacing.l * 5}px;
  z-index: 2;
`;

const maskingTapeBottom = css`
  ${maskingTape};
  margin-bottom: -${Spacing.l}px;
`;

const maskingTapeTop = css`
  ${maskingTape};
  margin-top: -${Spacing.l}px;
`;

const Preview: React.FC<{ url: string | null }> = ({ url }) => {
  const displayable = useSelector(selectors.displayable);
  const frame = useSelector(selectors.frame);

  return (
    <div
      className="absolute"
      style={{
        height: `${displayable.height}px`,
        top: `${displayable.y}px`,
        margin: `0 ${Spacing.l}px`,
        width: `${displayable.width}px`,
      }}
    >
      <div
        css={maskingTapeTop}
        style={{
          // フレームを含む画像の表示位置から予め用意した余白分左へ移動する
          left: `${frame.x - displayable.x - Spacing.l}px`,
          top: `${frame.y - displayable.y}px`,
        }}
      >
        <img src="/cheki/masking.png" width="100%" />
      </div>
      {url && (
        <img
          css={preview}
          id={getTutorialElementId("preview")}
          src={url}
          style={{
            height: `${frame.height}px`,
            left: `${frame.x - displayable.x}px`,
            width: `${frame.width}px`,
          }}
        />
      )}
      <div
        css={maskingTapeBottom}
        style={{
          // フレームを含む画像の表示位置から予め用意した余白を抜いた横幅分左へ移動する
          left: `${frame.x - displayable.x + frame.width - Spacing.l * 4}px`,
          top: `${frame.y - displayable.y + frame.height - Spacing.l * 2}px`,
        }}
      >
        <img src="/cheki/masking.png" width="100%" />
      </div>
    </div>
  );
};

const ChekiSaveAndShare: NextPage = () => {
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
      {previewUrl && <ChekiConfetti />}

      <ChekiFlexColumn>
        <ChekiHeader
          forceDisplayOnlyOnce={getScenarioCacheId("save")}
          scenario={previewUrl ? SAVE_PAGE_SCENARIO : undefined}
        />
        <ChekiCanvas
          emotion={css`
            margin-bottom: ${Spacing.l}px;
            margin-top: ${Spacing.l}px;
          `}
        >
          <ChekiCanvasChekiImage onCreatePreviewUrl={setPreviewUrl} />
        </ChekiCanvas>
        <Preview url={previewUrl} />

        <ChekiColumn margin>
          <ChekiNote>
            <ExternalLink href={TWITTER_HASHTAG_URL}>
              <ChekiHashTag>#ノネメちゃんチェキ</ChekiHashTag>
            </ExternalLink>
            を付けてシェアしよう
          </ChekiNote>
          <ChekiButton
            disabled={!previewUrl || isFetching}
            id={getTutorialElementId("share-twitter")}
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
