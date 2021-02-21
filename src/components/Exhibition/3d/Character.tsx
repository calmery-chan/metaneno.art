import { css } from "@emotion/react";
import React from "react";
import { Exhibition3dSpeechBubble } from "./SpeechBubble";
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
    <Exhibition3dSpeechBubble
      scenarios={[
        { message: "こんにちは", animation: "1" },
        { message: "x" },
        { message: "Message Test 2", animation: "2" },
      ]}
      onChangeAnimation={(animation) => {
        console.log(animation);
      }}
      onComplete={onClose}
    />
  );
});
