import { css } from "@emotion/react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiFooter } from "~/components/Cheki/Footer";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiLogo } from "~/components/Cheki/Logo";
import { ChekiNote } from "~/components/Cheki/Note";
import { TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { getShareImage, useDisplayable } from "~/utils/cheki";
import { Sentry } from "~/utils/sentry";

type ChekiShareProps = {
  imageUrl: string | null;
  ogImageUrl: string | null;
};

const ChekiShare: NextPage<ChekiShareProps> = ({ imageUrl, ogImageUrl }) => {
  const { push } = useRouter();
  const [size, setSize] = useState<{ width: number; height: number }>();

  const handleOnUpdateDisplayable = useCallback(
    ({ height, width }) => setSize({ height, width }),
    []
  );

  const ref = useDisplayable<HTMLDivElement>(handleOnUpdateDisplayable);

  // Events

  const handleOnClickStartButton = useCallback(() => push("/cheki"), []);

  // Render

  return (
    <ChekiApp
      seoProps={
        ogImageUrl
          ? {
              openGraph: {
                images: [
                  {
                    height: 630,
                    url: ogImageUrl,
                    width: 1200,
                  },
                ],
              },
            }
          : {}
      }
    >
      <ChekiFlexColumn>
        <div
          className="flex justify-center"
          css={css`
            height: 96px;
            margin-bottom: ${Spacing.m}px;
            margin-top: ${Spacing.l}px;
          `}
        >
          <ChekiLogo size={96} />
        </div>
        <div
          css={css`
            align-items: center;
            display: flex;
            width: 100%;
            flex-grow: 1;
            height: fit-content;
          `}
          ref={ref}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              css={css`
                height: ${size?.height || 0}px;
                width: ${size?.width || 0}px;
                object-fit: contain;
              `}
            />
          )}
          {!imageUrl && (
            <div
              className="font-bold mx-auto"
              css={css`
                ${Typography.S};
                color: ${Colors.black};
              `}
            >
              画像が見つかりませんでした
            </div>
          )}
        </div>
        <ChekiColumn margin>
          <ChekiNote>
            Twitterで
            <ExternalLink href={TWITTER_HASHTAG_URL}>
              <ChekiHashTag>#ノネメちゃんチェキ</ChekiHashTag>
            </ExternalLink>
            を見てみよう
          </ChekiNote>
          <ChekiButton onClick={handleOnClickStartButton}>
            ノネメちゃんチェキを試してみる！
          </ChekiButton>
        </ChekiColumn>
        <ChekiFooter />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

ChekiShare.getInitialProps = async ({ query }: NextPageContext) => {
  try {
    const { data } = await getShareImage(query.id as string);

    return {
      imageUrl: data.image_url,
      ogImageUrl: data.og_image_url,
    };
  } catch (error) {
    Sentry.captureException(error);

    return {
      imageUrl: null,
      ogImageUrl: null,
    };
  }
};

export default ChekiShare;
