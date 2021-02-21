import { css } from "@emotion/react";
import React from "react";
import { Spacing } from "~/styles/spacing";
import { AreaCharacterObject } from "~/types/exhibition";

// Styles

const container = css`
  padding: ${Spacing.m}px;
`;

// Main

export const Exhibition3dCharacter = React.memo<
  AreaCharacterObject & { onClose: () => void }
>(({ onClose, scenarios }) => {
  return (
    <div className="bottom-0 fixed h-full left-0 right-0 top-0 w-full">
      <div className="absolute bottom-0 w-full" css={container}>
        <div className="bg-white w-full">Hello</div>
      </div>
    </div>
  );
});
