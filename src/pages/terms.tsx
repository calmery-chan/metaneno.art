import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { ChekiButton } from "~/components/Cheki/Button";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { Colors, GradientColors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Border = styled.div`
  width: 100%;
  height: 2px;
  background: ${GradientColors.pinkToOrange};
`;

const Container = styled.div`
  padding: ${Spacing.l}px;
  color: ${Colors.black};
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${Spacing.l}px;

  img {
    height: 96px;
  }
`;

const Title = styled.h1`
  ${Typography.L};

  margin: 0;
  margin-bottom: ${Spacing.l}px;
`;

const SubTitle = styled.h2`
  ${Typography.M};

  margin: 0;
  margin-bottom: ${Spacing.s}px;
`;

const Text = styled.p`
  ${Typography.S};

  margin: 0;
  margin-bottom: ${Spacing.l}px;
`;

const HistoryButton = styled.div`
  margin-bottom: ${Spacing.m}px;

  a {
    text-decoration: none;
  }
`;

const Terms: NextPage = () => {
  const { push } = useRouter();
  const handleOnClickTop = useCallback(() => push("/"), []);

  return (
    <>
      <Border />
      <Container>
        <Title>利用規約</Title>
        <Text>
          この利用規約（以下「本規約」といいます）は、めたねのおくすり（以下「当サービス提供者」といいます）がこの
          Web
          サイト上で提供する「めたねのあーと」（以下「本サービス」といいます）の利用に関する条件を、本サービスを利用する皆さま（以下「ユーザー」といいます）と当サービス提供者との間で定めるものとします。
        </Text>
        <SubTitle>1. 適用</SubTitle>
        <Text>
          本規約は、当サービス提供者とユーザーとの間の本サービスの利用に関わる一切の関係に適用されるものとし、ユーザーは本規約に同意する場合に限り、本サービスを利用できるものとします。
        </Text>
        <SubTitle>2. 権利帰属</SubTitle>
        <Text>
          イラストや 3D
          モデルなどの本サービスに関連する一切の権利は当サービス提供者、または当サービス提供者に権利許諾した第三者に帰属します。
        </Text>
        <SubTitle>3. サービス内容の変更と停止</SubTitle>
        <Text>
          当サービス提供者は、ユーザーに通知することなく本サービスの内容を変更すること、また本サービスの提供を停止することができます。
        </Text>
        <SubTitle>4. 第三者サービスの利用</SubTitle>
        <Text>
          本サービスは、本サービスの改善や機能向上のため、第三者サービスを利用する場合があります。ユーザーはこの第三者サービスの使用を承諾するものとし、第三者サービスでユーザーに関する情報が取得された場合、この情報は第三者サービスのプライバシーポリシーや利用規約などに基づいて取り扱われることに同意します。
        </Text>
        <SubTitle>5. 禁止事項</SubTitle>
        <Text>
          当サービス提供者は、本サービスに関するユーザーによる以下の行為を禁止します。
          <br />
          <br />
          1. 法令または公序良俗に違反する行為
          <br />
          2.
          当サービス提供者や第三者のプライバシーを侵害する行為、または侵害するおそれのある行為
          <br />
          3.
          当サービス提供者のサービスを提供するために必要となるサーバーやネットワークの機能を破壊、妨害する行為
          <br />
          4. 当サービス提供者のサービスの運営を妨害するおそれのある行為
          <br />
          5. これら禁止事項に該当する行為を援助または助長する行為
          <br />
          6. その他、当サービス提供者が不適当と合理的に判断した行為
        </Text>
        <SubTitle>6. 保証の否認と免責事項</SubTitle>
        <Text>
          当サービス提供者は、本サービスに関する事実上または法律上の瑕疵がないこと、ならびに安全性や信頼性、正確性、完全性、有効性および特定の目的への適合性を明示的にも黙示的にも保証していません。また、当サービス提供者は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。
        </Text>
        <SubTitle>7. 利用規約の変更</SubTitle>
        <Text>
          当サービス提供者は、本サービスの目的の範囲内で、ユーザーに通知することなく本規約を変更できるものとします。ユーザーは本規約の変更後も本規約に同意した上で、本サービスを利用するものとし、本規約変更後に本サービスを利用した場合、本規約に同意したものとみなします。
        </Text>
        <SubTitle>8. 準拠法と裁判管轄</SubTitle>
        <Text>
          本規約は日本語を正文とし、日本法を準拠法とします。本規約に関して生じた一切の紛争については当サービス提供者の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。
        </Text>
        <Text>以上</Text>
        <Text>2020/02/20 制定</Text>
        <HistoryButton>
          <a href="https://gist.github.com/calmery/c87641812f7b3cb790742ca3c09069ff/revisions">
            <ChekiButton>変更履歴を見る</ChekiButton>
          </a>
        </HistoryButton>
        <ChekiSubButton onClick={handleOnClickTop}>トップに戻る</ChekiSubButton>
      </Container>
    </>
  );
};

export default Terms;
