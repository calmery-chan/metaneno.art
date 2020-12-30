import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { ExternalLink } from "./ExternalLink";
import { Icon } from "./Icon";
import { ChekiModal, ChekiModalText, ChekiModalTitle } from "./Modal";
import { ChekiPopup } from "./Popup";
import { Tutorial } from "./Tutorial";
import { Colors, GradientColors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { ChekiScenario } from "~/types/ChekiScenario";
import * as GA from "~/utils/cheki/google-analytics";

const Container = styled.div`
  box-sizing: content-box;
  display: flex;
  height: 24px;
  padding: ${Spacing.l}px;
  padding-bottom: ${Spacing.m}px;

  img {
    ${Mixin.clickable};

    cursor: pointer;
    height: 24px;

    &:last-child {
      margin-left: auto;
    }
  }
`;

const Contributor: React.FC<{
  contribution: string;
  icon: string;
  link: string;
  name: string;
}> = ({ contribution, icon, link, name }) => (
  <ExternalLink
    className="flex-shrink-0"
    css={css`
      width: 50%;
      margin-top: ${Spacing.xs}px;
      padding: 0 !important;
      &:first-of-type,
      &:nth-of-type(2) {
        margin-top: 0;
      }
    `}
    href={link}
  >
    <div
      className="flex items-center"
      css={css`
        ${Mixin.clickable};
      `}
    >
      <div
        className="rounded-full"
        css={css`
          padding: 2px;
          background: ${GradientColors.pinkToOrange};
          height: 40px;
          width: 40px;
        `}
      >
        <img
          alt={name}
          className="rounded-full"
          css={css`
            height: 100%;
            width: 100%;
          `}
          src={icon}
        />
      </div>
      <div
        className="font-bold"
        css={css`
          color: ${Colors.black};
          margin-left: ${Spacing.xs}px;
        `}
      >
        {name}
        <div
          css={css`
            ${Typography.XS};
            color: ${Colors.gray};
          `}
        >
          {contribution}
        </div>
      </div>
    </div>
  </ExternalLink>
);

export const ChekiHeader: React.FC<{ scenario?: ChekiScenario[] }> = ({
  scenario,
}) => {
  const { pathname, push } = useRouter();
  const [information, setInformation] = useState(false);
  const [backToTop, setBackToTop] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);

  const handleOnClickBackToTop = useCallback(() => push("/"), []);
  const handleOnClickClosePopup = useCallback(() => setBackToTop(false), []);
  const handleOnClickHelpButton = useCallback(() => setIsTutorial(true), []);
  const handleOnClickInformation = useCallback(
    () => setInformation(!information),
    [information]
  );
  const handleOnClickOpenPopup = useCallback(() => setBackToTop(true), []);
  const handleOnClickOpenTerms = useCallback(
    () => push("/cheki/terms-of-service"),
    []
  );
  const handleOnCompleteTutorial = useCallback(() => {
    setIsTutorial(false);
    GA.completeTutorial(pathname);
  }, [pathname]);
  const handleOnStopTutorial = useCallback(() => {
    setIsTutorial(false);
    GA.stopTutorial(pathname);
  }, [pathname]);

  return (
    <>
      <Container>
        <Icon
          alt="閉じる"
          height="24px"
          onClick={handleOnClickOpenPopup}
          src="/cheki/close.svg"
          width="24px"
        />
        {scenario && (
          <Icon
            alt="ヘルプ"
            height="24px"
            onClick={handleOnClickHelpButton}
            src={
              information
                ? "/cheki/information.selected.svg"
                : "/cheki/information.svg"
            }
            width="24px"
          />
        )}
        <Icon
          alt="インフォメーション"
          height="24px"
          onClick={handleOnClickInformation}
          src={
            information
              ? "/cheki/information.selected.svg"
              : "/cheki/information.svg"
          }
          width="24px"
        />
      </Container>

      <ChekiModal
        visible={information}
        onClickCloseButton={() => {
          setInformation(false);
        }}
      >
        <ChekiModalTitle>ノネメちゃんチェキとは？</ChekiModalTitle>
        <ChekiModalText>
          天使の女の子、ノネメちゃん。
          <br />
          <br />
          ふわふわの綺麗な羽、うす黄色からピンクのグラデーションでくるくるふわふわの髪の毛、ぱっちり目だけど少しとろーんとしている金色の瞳が特徴。綺麗な景色やお花などの植物が好きで、よく人間界を散歩しているそうです。(本当は天界でのお仕事があるみたいだけど…)
          <br />
          <br />
          たまたま通りかかった暇そうな人と一緒に会話したり、写真を撮ったりして一期一会を楽しんでいるときもあるとの噂です。
          <br />
          <br />
          そんなノネメちゃんとのチェキをあなたも撮ってみませんか？
        </ChekiModalText>
        <ChekiModalTitle>クレジット</ChekiModalTitle>
        <ChekiModalText>
          <div className="flex flex-wrap">
            <Contributor
              contribution="ノネメ役 出演"
              link="https://twitter.com/no0xe"
              icon="/cheki/authors/no0xe.jpg"
              name="ノネメ"
            />
            <Contributor
              contribution="イラスト"
              link="https://metaneno.net/"
              icon="/cheki/authors/metanen0x0.jpg"
              name="めたねのおくすり"
            />
            <Contributor
              contribution="ロゴデザイン"
              link="https://touya-design.tumblr.com/"
              icon="/cheki/authors/touya.png"
              name="燈弥"
            />
            <Contributor
              contribution="開発/デザイン"
              link="https://calmery.me/"
              icon="/cheki/authors/calmery.jpg"
              name="Calmery"
            />
          </div>
        </ChekiModalText>
        <ChekiModalTitle>お問い合わせ</ChekiModalTitle>
        <ChekiModalText>
          ご感想や不具合の報告、その他お問い合わせは
          <a
            href="https://forms.gle/3snQ5xwAJJn86Mv69"
            target="_blank"
            rel="noopener noreferrer"
          >
            こちらの Google フォーム
          </a>
          までお願いします。
        </ChekiModalText>
        <ChekiModalTitle>利用規約</ChekiModalTitle>
        <ChekiModalText>
          利用規約は
          <a
            css={css`
              cursor: pointer;
            `}
            onClick={handleOnClickOpenTerms}
          >
            こちら
          </a>
          をご確認ください。
        </ChekiModalText>
      </ChekiModal>

      {backToTop && (
        <ChekiPopup
          onCancel={handleOnClickClosePopup}
          onEnter={handleOnClickBackToTop}
          enterText="戻る"
        >
          めたねのあーとのトップページに戻りますか？
          <br />
          編集中の内容は全て失われます！
        </ChekiPopup>
      )}

      {scenario && isTutorial && (
        <Tutorial
          scenarios={scenario}
          onComplete={handleOnCompleteTutorial}
          onStop={handleOnStopTutorial}
        />
      )}
    </>
  );
};
