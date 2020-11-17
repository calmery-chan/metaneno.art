import classnames from "classnames";
import { css } from "linaria";
import { styled } from "linaria/react";
import React, { useState, useEffect } from "react";
import { Colors, GradientColors } from "~/styles/colors";
import { Media } from "~/styles/media";
import { fadeIn, fadeInUp, fadeOut, fadeOutDown, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 2147483647;
`;

const Background = styled.div`
  ${Mixin.animation};

  width: 100%;
  height: 100%;
  background: ${Colors.blackTransparent};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
`;

const Body = styled.div`
  ${Mixin.animation};

  background: ${Colors.white};
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  position: fixed;
  overflow: scroll;

  ${Media.queries.pc} {
    padding: 0 ${Spacing.xl}px ${Spacing.m}px;
    width: 600px;
    height: 450px;
    top: 50%;
    left: 50%;
    margin: -225px 0 0 -300px;
  }

  ${Media.queries.sp} {
    padding: 0 ${Spacing.l}px ${Spacing.m}px;
    width: 100%;
    height: calc(100% - 80px);
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const CloseButton = styled.div`
  width: 100%;
  padding: ${Spacing.m}px 0;
  text-align: center;
  cursor: pointer;

  img {
    vertical-align: bottom;
  }
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background: ${GradientColors.pinkToOrange};
`;

const Contents = styled.div`
  width: 100%;
  height: max-content;

  ${Media.queries.pc} {
    margin-top: ${Spacing.l}px;
  }

  ${Media.queries.sp} {
    margin-top: ${Spacing.l}px;
  }
`;

type ChekiModalProps = {
  children: React.ReactNode;
  onClickCloseButton: () => void;
  visible: boolean;
};

export const ChekiModal: React.FC<ChekiModalProps> = ({
  children,
  onClickCloseButton,
  visible,
}: ChekiModalProps) => {
  const [isFirstUpdate, setFirstUpdate] = useState(true);
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(true);

  useEffect(() => {
    if (isFirstUpdate) {
      setFirstUpdate(false);
      return;
    }

    setIsAnimationCompleted(false);

    const animationTimer = setTimeout(
      () => setIsAnimationCompleted(true),
      Mixin.ANIMATION_DURATION.milliseconds
    );
    return () => clearTimeout(animationTimer);
  }, [visible]);

  if (!visible && isAnimationCompleted) {
    return null;
  }

  return (
    <Container>
      <Background
        onClick={onClickCloseButton}
        className={visible ? fadeIn : fadeOut}
      />
      <Body className={visible ? fadeInUp : fadeOutDown}>
        <CloseButton onClick={onClickCloseButton}>
          <img src="/close.svg" alt="閉じる" />
        </CloseButton>
        <Border />
        <Contents>{children}</Contents>
      </Body>
    </Container>
  );
};

export const ChekiModalTitle: React.FC = ({ children }) => (
  <div
    className={classnames(
      css`
        color: ${Colors.black};
        font-family: Roboto, sans-serif;
        margin-bottom: ${Spacing.s}px;
      `,
      Typography.L
    )}
  >
    {children}
  </div>
);

export const ChekiModalText: React.FC = ({ children }) => (
  <div
    className={classnames(
      css`
        color: ${Colors.black};
        font-family: Roboto, sans-serif;
        margin-bottom: ${Spacing.m}px;

        a {
          color: ${Colors.black};
          font-family: Roboto, sans-serif;
          font-weight: bold;
          padding: 0 ${Spacing.xs}px;
        }

        img {
          border-radius: 4px;
        }
      `,
      Typography.S
    )}
  >
    {children}
  </div>
);
