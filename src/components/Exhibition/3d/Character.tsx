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
    onChangeActions: (actions: string[]) => void;
    onChangeAnimations: (id: string, animations: string[][]) => void;
    onClose: () => void;
  }
>(({ id, name, onClose, onChangeActions, onChangeAnimations, scenarios }) => (
  <Exhibition3dSpeechBubble
    name={name}
    scenarios={scenarios}
    onChangeActions={onChangeActions}
    onChangeAnimations={(animations) => onChangeAnimations(id, animations)}
    onComplete={onClose}
  />
));
