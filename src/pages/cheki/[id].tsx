import classnames from "classnames";
import { css } from "linaria";
import { styled } from "linaria/react";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "~/components/Button";
import { HashTag } from "~/components/HashTag";
import { Page } from "~/components/Page";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { getShareImage } from "~/utils/cheki";

// Styles

const Container = styled.div`
  color: ${Colors.black};
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 100%;
`;

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

const Try = styled.div`
  margin-top: ${Spacing.l}px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin: ${Spacing.l}px 0;

  a {
    color: ${Colors.black};
    margin-right: ${Spacing.s}px;
    text-decoration: none;

    &:last-child {
      margin-right: 0;
    }
  }
`;

// Types

type ShareProps = {
  imageUrl: string;
  ogImageUrl: string;
};

// Components

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Share: NextPage<ShareProps> = ({ imageUrl, ogImageUrl }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { push } = useRouter();
  const [size, setSize] = useState<{ width: number; height: number }>();

  useEffect(() => {
    const { current } = ref;

    if (!current) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => {
      setSize(current.getBoundingClientRect());
    });

    resizeObserver.observe(current);

    return () => {
      resizeObserver.unobserve(current);
    };
  }, [ref]);

  const handleOnClickStartButton = useCallback(() => push("/cheki"), []);

  return (
    <Page margin>
      <Container>
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

        <Try>
          <div
            className={classnames(
              Typography.XS,
              "font-bold text-center",
              css`
                color: ${Colors.black};
                margin-bottom: ${Spacing.s}px;
              `
            )}
          >
            Twitterで
            <a
              href="https://twitter.com/hashtag/%E3%83%8E%E3%83%8D%E3%83%A1%E3%81%A1%E3%82%83%E3%82%93%E3%83%81%E3%82%A7%E3%82%AD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <HashTag>#ノネメちゃんチェキ</HashTag>
            </a>
            を見てみよう
          </div>
          <Button maxWidth={512} onClick={handleOnClickStartButton}>
            ノネメちゃんチェキを試してみる！
          </Button>
        </Try>

        <Footer className={Typography.XS}>
          <a href="https://metaneno.art/">めたねのあーと</a>
          <a href="terms-of-service">利用規約</a>
          <a
            href="https://forms.gle/37ucm5pkdZV7L4HAA"
            target="_blank"
            rel="noopener noreferrer"
          >
            お問い合わせ
          </a>
        </Footer>
      </Container>
    </Page>
  );
};

Share.getInitialProps = async ({ query }: NextPageContext) => {
  const { data } = await getShareImage(query.id as string);

  return {
    imageUrl: data.image_url,
    ogImageUrl: data.og_image_url,
  };
};

export default Share;
