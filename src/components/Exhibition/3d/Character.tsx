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
  AreaCharacterObject & {
    onChangeAnimation: (id: string, animation: string) => void;
    onClose: () => void;
  }
>(({ id, name, onClose, onChangeAnimation, scenarios }) => (
  <Exhibition3dSpeechBubble
    name={name}
    scenarios={scenarios}
    onChangeAnimation={(animation) => onChangeAnimation(id, animation)}
    onComplete={onClose}
  />
));
