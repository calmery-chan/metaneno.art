import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNote } from "~/components/Cheki/Note";
import { TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasFramedImage } from "~/containers/Cheki/CanvasFramedImage";
import { ChekiCanvasLayerFrameImage } from "~/containers/Cheki/CanvasLayerFrameImage";
import { ChekiCanvasLayerImage } from "~/containers/Cheki/CanvasLayerImage";
import { ChekiCanvasLayerShadow } from "~/containers/Cheki/CanvasLayerShadow";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { selectors, useSelector } from "~/domains";
import { Spacing } from "~/styles/spacing";
import { convertSvgToDataUrl, getShareUrlById, upload } from "~/utils/cheki";
import * as GA from "~/utils/cheki/google-analytics";

const ChekiSaveAndShare: NextPage = () => {
  const { layout } = useSelector(selectors.cheki);
  const { displayable, frame } = layout;

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

  const handleOnCreatePreviewUrl = useCallback(setPreviewUrl, []);

  const canvasRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const { current } = canvasRef;

    if (!current) {
      return;
    }

    const { parentElement } = current;

    if (!parentElement) {
      return;
    }

    (async () => {
      const div = document.createElement("div");
      div.innerHTML = parentElement.innerHTML;

      const svg = div.querySelector("svg") as SVGSVGElement;

      svg.setAttribute("width", `${frame.viewBoxWidth}`);
      svg.setAttribute("height", `${frame.viewBoxHeight}`);
      svg.removeAttribute("x");
      svg.removeAttribute("y");

      const previewUrl = await convertSvgToDataUrl(
        div.innerHTML,
        frame.viewBoxWidth,
        frame.viewBoxHeight
      );

      handleOnCreatePreviewUrl(previewUrl);
    })();
  }, [canvasRef, frame, handleOnCreatePreviewUrl]);

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />

        <ChekiCanvas>
          <ChekiCanvasFramedImage>
            <ChekiCanvasLayerFrameImage />
            <ChekiCanvasLayerImage />
            <ChekiCanvasLayerShadow />
          </ChekiCanvasFramedImage>
        </ChekiCanvas>
        <div
          className="absolute"
          css={css`
            height: ${displayable.height}px;
            width: ${displayable.width}px;
          `}
        >
          {previewUrl && (
            <img
              css={css`
                height: 100%;
                width: 100%;
                object-fit: contain;
              `}
              src={previewUrl}
            />
          )}
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
                <img
                  alt="Twitter"
                  css={css`
                    display: inline-block;
                    height: 14px;
                    margin-right: ${Spacing.xs}px;
                    vertical-align: top;
                  `}
                  src="/cheki/twitter.svg"
                />
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
