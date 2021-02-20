import { css } from "@emotion/react";
import React, { ChangeEvent, useCallback } from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const border = css`
  margin: ${Spacing.m}px 0;
`;

const group = css`
  color: ${Colors.black};
  gap: ${Spacing.s}px;
  margin-bottom: ${Spacing.m}px;
`;

const groupTitle = css`
  ${Typography.M};
  height: 18px;
`;

const label = css`
  ${Typography.S};
  margin-left: ${Spacing.s}px;
`;

const value = css`
  ${Typography.S};
  padding: 0 ${Spacing.s}px;
`;

// Main

const Group: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid" css={group}>
    {children}
  </div>
);

const GroupTitle: React.FC<{ children: string }> = ({ children }) => (
  <div className="font-bold" css={groupTitle}>
    {children}
  </div>
);

export const Settings: React.FC<{
  currentAudioVolume: number;
  currentGraphicsQuality: "high" | "low" | "middle";
  muted: boolean;
  onChangeAudioVolume: (audioVolume: number) => void;
  onChangeGraphicsQuality: (graphics: "high" | "low" | "middle") => void;
  onClickMuteToggle: () => void;
  onClose: () => void;
}> = ({
  currentAudioVolume,
  currentGraphicsQuality,
  muted,
  onChangeAudioVolume,
  onChangeGraphicsQuality,
  onClickMuteToggle,
  onClose,
}) => {
  const handleChangeAudioVolume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const audioVolume = parseFloat(event.currentTarget.value);

      if (audioVolume < 0 || 1 < audioVolume) {
        return;
      }

      onChangeAudioVolume(audioVolume);
    },
    [onChangeAudioVolume]
  );

  const handleChangeGraphics = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const graphics = event.currentTarget.value;

      if (graphics !== "high" && graphics !== "low" && graphics !== "middle") {
        return;
      }

      onChangeGraphicsQuality(graphics);
    },
    [onChangeGraphicsQuality]
  );

  return (
    <ExhibitionPopup onClose={onClose} label="設定">
      <Group>
        <GroupTitle>音量</GroupTitle>
        <div className="flex">
          <input
            defaultValue={currentAudioVolume}
            disabled={muted}
            className="w-full"
            max="1"
            min="0"
            onChange={handleChangeAudioVolume}
            step="0.1"
            type="range"
          />
          <div css={value}>{currentAudioVolume * 10}</div>
        </div>
        <div
          className="cursor-pointer flex items-center"
          onClick={onClickMuteToggle}
        >
          <input type="checkbox" checked={muted} />
          <div css={label}>消音</div>
        </div>
      </Group>
      <hr css={border} />
      <Group>
        <GroupTitle>画質</GroupTitle>
        <select
          css={Typography.M}
          defaultValue={currentGraphicsQuality}
          onChange={handleChangeGraphics}
        >
          <option value="low">低</option>
          <option value="middle">中</option>
          <option value="high">高</option>
        </select>
      </Group>
    </ExhibitionPopup>
  );
};
