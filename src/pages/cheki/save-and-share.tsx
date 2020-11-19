import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNote } from "~/components/Cheki/Note";
import { TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiPreview } from "~/containers/Cheki/Preview";
import { Spacing } from "~/styles/spacing";
import { getShareUrlById, upload } from "~/utils/cheki";

const TwitterImage = styled.img`
  height: 14px;
  margin-right: ${Spacing.xs}px;
`;

const ChekiSaveAndShare: NextPage = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [shareId, setShareId] = useState<string | null>(null);

  // Side Effects

  useEffect(() => {
    if (!shareId) {
      return;
    }

    window.location.href = getShareUrlById(shareId);
  }, [shareId]);

  // Events

  const handleOnClickShareButton = useCallback(async () => {
    if (!previewUrl) {
      return;
    }

    if (!shareId) {
      setShareId(await upload(previewUrl));
    }
  }, [previewUrl, shareId]);

  const handleOnCreatePreviewUrl = useCallback(setPreviewUrl, []);

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiPreview onCreatePreviewUrl={handleOnCreatePreviewUrl} />
        <ChekiColumn margin>
          <ChekiNote>
            <ExternalLink href={TWITTER_HASHTAG_URL}>
              <ChekiHashTag>#ノネメちゃんチェキ</ChekiHashTag>
            </ExternalLink>
            を付けてシェアしよう
          </ChekiNote>
          <ChekiButton
            disabled={!previewUrl}
            onClick={handleOnClickShareButton}
          >
            <TwitterImage alt="Twitter" src="/twitter.svg" />
            Twitter にシェアする
          </ChekiButton>
        </ChekiColumn>
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default ChekiSaveAndShare;
