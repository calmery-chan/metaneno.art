import React from "react";
import { Exhibition3dSpeechBubble } from "./SpeechBubble";
import { Scenario } from "~/types/exhibition";

export const Exhibition3dCharacter = React.memo<{
  onChangeActions: (actions: string[]) => void;
  onChangeAnimations: (animations: string[][]) => void;
  onClose: () => void;
  scenarios: Scenario[];
}>(({ onClose, onChangeActions, onChangeAnimations, scenarios }) => (
  <Exhibition3dSpeechBubble
    scenarios={scenarios}
    onChangeActions={onChangeActions}
    onChangeAnimations={onChangeAnimations}
    onComplete={onClose}
  />
));
