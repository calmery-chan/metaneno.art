import { styled } from "linaria/react";
import { NextPage } from "next";
import React, { useCallback, useEffect, useState } from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { ChekiNote } from "~/components/Cheki/Note";
import { TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { Spacing } from "~/styles/spacing";
import { getShareUrlById, upload } from "~/utils/cheki";

const TwitterImage = styled.img`
  height: 14px;
  margin-right: ${Spacing.xs}px;
`;

const SaveAndShare: NextPage = () => {
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
        <ChekiCanvas preview onCreatePreviewUrl={handleOnCreatePreviewUrl} />
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
        <ChekiNavigation active="save-and-share" />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default SaveAndShare;
