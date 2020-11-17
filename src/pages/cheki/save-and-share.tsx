import { styled } from "linaria/react";
import { NextPage } from "next";
import React from "react";
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

const TwitterImage = styled.img`
  height: 14px;
  margin-right: ${Spacing.xs}px;
`;

const SaveAndShare: NextPage = () => {
  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiCanvas />
        <ChekiColumn margin>
          <ChekiNote>
            <ExternalLink href={TWITTER_HASHTAG_URL}>
              <ChekiHashTag>#ノネメちゃんチェキ</ChekiHashTag>
            </ExternalLink>
            を付けてシェアしよう
          </ChekiNote>
          <ChekiButton>
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
