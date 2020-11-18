import { styled } from "linaria/react";
import React, { useRef, useCallback } from "react";
import { ChekiSubButton } from "./SubButton";
import { ChekiButton } from "~/components/Cheki/Button";
import { Colors } from "~/styles/colors";
import { bounceIn, bounceOut, fadeIn, fadeOut, Mixin } from "~/styles/mixin";
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  position: fixed;
`;

const PopupContainer = styled.div`
  position: absolute;
`;

const PopupInner = styled.div`
  ${Mixin.animation};

  max-width: 360px;
  box-sizing: border-box;
  padding: ${Spacing.l}px ${Spacing.m}px;
  margin: ${Spacing.l}px;
  background: ${Colors.white};
  border-radius: 4px;
  text-align: center;
`;

const PopupInnerMessage = styled.div`
  font-family: Roboto, sans-serif;
  color: ${Colors.black};
  padding: 0 ${Spacing.s}px ${Spacing.m}px ${Spacing.s}px;
`;

const PopupInnerButtons = styled.div`
  display: flex;

  > * {
    margin-left: ${Spacing.m}px;
    font-family: Roboto, sans-serif;

    &:first-child {
      margin-left: 0;
    }
  }
`;

interface PopupProps {
  onEnter: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
  enterText?: string;
  cancalText?: string;
}

export const ChekiPopup: React.FC<PopupProps> = ({
  enterText,
  cancalText,
  children,
  onEnter,
  onCancel,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const handleOnClickCancel = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const e = ref.current!;
    e.classList.add(bounceOut);

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const b = backgroundRef.current!;
      b.classList.add(fadeOut);
    }, 200);

    setTimeout(() => {
      onCancel && onCancel();
    }, 800);
  }, [ref, onCancel]);

  const handleOnClickEnter = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const e = ref.current!;
    e.classList.add(bounceOut);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const b = backgroundRef.current!;
    b.classList.add(fadeOut);

    setTimeout(() => {
      onEnter();
    }, 800);
  }, [ref, onEnter]);

  return (
    <Container>
      <Background
        ref={backgroundRef}
        className={fadeIn}
        onClick={handleOnClickCancel}
      />
      <PopupContainer>
        <PopupInner ref={ref} key={children?.toString()} className={bounceIn}>
          <PopupInnerMessage className={Typography.M}>
            {children}
          </PopupInnerMessage>
          <PopupInnerButtons>
            {onCancel && (
              <ChekiButton onClick={handleOnClickCancel}>
                {cancalText || "キャンセル"}
              </ChekiButton>
            )}
            <ChekiSubButton onClick={handleOnClickEnter}>
              {enterText || "わかった"}
            </ChekiSubButton>
          </PopupInnerButtons>
        </PopupInner>
      </PopupContainer>
    </Container>
  );
};
