import styled from "@emotion/styled";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ExternalLink } from "~/components/Cheki/ExternalLink";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiFooter } from "~/components/Cheki/Footer";
import { ChekiHashTag } from "~/components/Cheki/HashTag";
import { ChekiNote } from "~/components/Cheki/Note";
import { TWITTER_HASHTAG_URL } from "~/constants/cheki";
import { Spacing } from "~/styles/spacing";
import { getShareImage } from "~/utils/cheki";

// Styles

const Header = styled.div`
  height: 64px;
  margin-bottom: ${Spacing.m}px;
  margin-top: ${Spacing.l}px;
`;

const Image = styled.div`
  align-items: center;
  flex: 1;
  display: flex;
  width: 100%;
`;

// Types

const ChekiShare: NextPage<{
  imageUrl: string;
  ogImageUrl: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}> = ({ imageUrl, ogImageUrl }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { push } = useRouter();
  const [size, setSize] = useState<{ width: number; height: number }>();

  // Side Effects

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() =>
      setSize(current.getBoundingClientRect())
    );

    resizeObserver.observe(current);
    setSize(current.getBoundingClientRect());

    return () => {
      resizeObserver.unobserve(current);
    };
  }, [ref]);

  // Events

  const handleOnClickStartButton = useCallback(() => push("/cheki"), []);

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <Header className="text-center" />
        <Image ref={ref}>
          {size && (
            <img
              src="/example.jpg"
              style={
                size && {
                  height: `${size?.height}px`,
                  width: `${size?.width}px`,
                  objectFit: "contain",
                }
              }
            />
          )}
        </Image>
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
  const { data } = await getShareImage(query.id as string);

  return {
    imageUrl: data.image_url,
    ogImageUrl: data.og_image_url,
  };
};

export default ChekiShare;
