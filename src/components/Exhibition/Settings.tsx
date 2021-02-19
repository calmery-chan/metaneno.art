import { css } from "@emotion/react";
import { Howler } from "howler";
import { ChangeEvent, useCallback, useState } from "react";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const container = css`
  color: ${Colors.black};
  padding: ${Spacing.m}px;
`;

const header = css`
  margin-bottom: ${Spacing.s}px;
`;

const menu = css`
  ${Mixin.animation};

  background: ${Colors.blackTransparent};
  opacity: 0.48;
  border-radius: 2px;
  padding: ${Spacing.xs}px ${Spacing.s}px;
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;

  &:hover {
    opacity: 1;
  }

  img {
    ${Mixin.clickable};

    margin-left: ${Spacing.s}px;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const title = css`
  ${Typography.L};

  font-weight: bold;
`;

// Main

export const ExhibitionSettings: React.FC = () => {
  const [currentAudioVolume, setCurrentAudioVolume] = useState(Howler.volume());
  const [isMuteAudio, setIsMuteAudio] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // Events

  const handleChangeAudioVolume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const volume = parseFloat(event.currentTarget.value);

      if (volume < 0 || 1 < volume) {
        return;
      }

      Howler.volume(currentAudioVolume);
      setCurrentAudioVolume(volume);
    },
    []
  );

  const handleClickMuteAudioToggle = useCallback(() => {
    Howler.volume(isMuteAudio ? currentAudioVolume : 0);
    setIsMuteAudio(!isMuteAudio);
  }, [currentAudioVolume, isMuteAudio]);

  const handleClickCloseSettings = useCallback(() => {
    setIsOpenSettings(false);
  }, []);

  const handleClickOpenSettings = useCallback(() => {
    setIsOpenSettings(true);
  }, []);

  // Render

  if (!isOpenSettings) {
    return (
      <div className="fixed flex" css={menu}>
        <img
          alt="音量"
          onClick={handleClickMuteAudioToggle}
          src={`/exhibition/audio-${isMuteAudio ? "off" : "on"}.svg`}
        />
        <img
          alt="設定"
          onClick={handleClickOpenSettings}
          src="/exhibition/settings.svg"
        />
      </div>
    );
  }

  return (
    <div
      className="bg-white bottom-0 fixed flex flex-col h-full left-0 right-0 top-0 w-full"
      css={container}
    >
      <div className="flex items-center w-full" css={header}>
        <div css={title}>設定</div>
        <div
          className="cursor-pointer ml-auto"
          onClick={handleClickCloseSettings}
        >
          <img src="/exhibition/close.svg" alt="閉じる" />
        </div>
      </div>
      <div className="overflow-scroll">
        <input
          max="1"
          min="0"
          onChange={handleChangeAudioVolume}
          step="0.1"
          type="range"
        />
      </div>
    </div>
  );
};
