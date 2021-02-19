import { css } from "@emotion/react";
import React, { useCallback, useState } from "react";
import { fadeIn, fadeInUp, fadeOut, fadeOutDown } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const background = css`
  backdrop-filter: blur(4px);
  background: ${Colors.blackTransparent};
`;

const body = css`
  max-height: 768px;
  max-width: 1024px;
  padding: ${Spacing.m}px;
`;

const close = css`
  ${Mixin.clickable};
  height: 24px;
  width: 24px;
`;

const container = css`
  padding: ${Spacing.m}px;
`;

const header = css`
  margin-bottom: ${Spacing.s}px;
`;

// Main

export const ExhibitionPopup = React.memo<{
  children: React.ReactNode;
  onClose: () => void;
}>(({ children, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Events

  const handleClickCloseButton = useCallback(() => {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, Mixin.ANIMATION_DURATION.milliseconds);
  }, [onClose]);

  // Render

  return (
    <div
      className="bottom-0 fixed grid h-full left-0 place-items-center right-0 top-0 w-full"
      css={container}
    >
      <div
        className="absolute h-full w-full"
        css={css`
          ${background};
          ${isVisible ? fadeIn : fadeOut}
        `}
        onClick={handleClickCloseButton}
      />
      <div
        className="bg-white flex flex-col h-full w-full"
        css={css`
          ${body};
          ${isVisible ? fadeInUp : fadeOutDown}
        `}
      >
        <div className="flex items-center" css={header}>
          <div css={Typography.L}>Title</div>
          <div className="ml-auto" css={close} onClick={handleClickCloseButton}>
            <img src="/exhibition/close.svg" />
          </div>
        </div>
        <div className="flex-grow">{children}</div>
      </div>
    </div>
  );
});
