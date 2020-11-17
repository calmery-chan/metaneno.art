import { styled } from "linaria/lib/react";
import React, { useCallback, useState } from "react";
import { ChekiModal, ChekiModalText, ChekiModalTitle } from "./Modal";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

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

export const ChekiHeader: React.FC = () => {
  const [information, setInformation] = useState(false);

  const handleOnClickInformation = useCallback(() => {
    setInformation(!information);
  }, [information]);

  return (
    <>
      <Container>
        <a href="/">
          <img alt="閉じる" src="/close.svg" />
        </a>
        <img
          alt="インフォメーション"
          onClick={handleOnClickInformation}
          src={information ? "/information.selected.svg" : "/information.svg"}
        />
      </Container>

      <ChekiModal
        visible={information}
        onClickCloseButton={() => {
          setInformation(false);
        }}
      >
        <ChekiModalTitle>利用規約</ChekiModalTitle>
        <ChekiModalText>
          利用規約は
          <a href="/cheki/terms-of-service">こちら</a>
          をご確認ください。
        </ChekiModalText>
        <ChekiModalTitle>お問い合わせ</ChekiModalTitle>
        <ChekiModalText>
          ご感想や不具合の報告は
          <a
            href="https://forms.gle/37ucm5pkdZV7L4HAA"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google フォーム
          </a>
          までお願いします。
        </ChekiModalText>
      </ChekiModal>
    </>
  );
};
