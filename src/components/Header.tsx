import { styled } from "linaria/lib/react";
import React, { useCallback, useState } from "react";
import { Modal } from "./Modal";
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

export const Header: React.FC = () => {
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
          src="/information.svg"
        />
      </Container>

      <Modal
        visible={information}
        onClickCloseButton={() => {
          setInformation(false);
        }}
      >
        Test
      </Modal>
    </>
  );
};
