import { css } from "@emotion/react";
import { Howler } from "howler";
import React, { ChangeEvent, useCallback, useState } from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

const header = css`
  margin-bottom: ${Spacing.s}px;
`;

const menu = css`
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;
`;

const menuGroup = css`
  ${Mixin.animation};

  background: ${Colors.blackTransparent};
  border-radius: 2px;
  margin-left: ${Spacing.s}px;
  opacity: 0.48;
  padding: ${Spacing.xs}px ${Spacing.s}px;
  right: ${Spacing.m}px;
  top: ${Spacing.m}px;

  &:first-child {
    margin-left: 0;
  }

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

const OkusuriLand: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return <ExhibitionPopup onClose={onClose}>Okusuri.land</ExhibitionPopup>;
};

const Settings: React.FC<{
  currentAudioVolume: number;
  onChangeAudioVolume: (audioVolume: number) => void;
  onClose: () => void;
}> = ({ currentAudioVolume, onClose, onChangeAudioVolume }) => {
  const handleChangeAudioVolume = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const audioVolume = parseFloat(event.currentTarget.value);

      if (audioVolume < 0 || 1 < audioVolume) {
        return;
      }

      onChangeAudioVolume(audioVolume);
    },
    []
  );

  return (
    <ExhibitionPopup onClose={onClose}>
      <div className="flex items-center w-full" css={header}>
        <div css={title}>設定</div>
        <div className="cursor-pointer ml-auto" onClick={onClose}>
          <img src="/exhibition/close.svg" alt="閉じる" />
        </div>
      </div>
      <div className="overflow-scroll">
        <input
          defaultValue={currentAudioVolume}
          max="1"
          min="0"
          onChange={handleChangeAudioVolume}
          step="0.1"
          type="range"
        />
      </div>
    </ExhibitionPopup>
  );
};

export const ExhibitionMenu: React.FC = () => {
  const [currentAudioVolume, setCurrentAudioVolume] = useState(Howler.volume());
  const [isMuteAudio, setIsMuteAudio] = useState(false);
  const [isOpenOkusuriLand, setIsOpenOkusuriLand] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // Events

  const handleChangeAudioVolume = useCallback((audioVolume: number) => {
    Howler.volume(audioVolume);
    setCurrentAudioVolume(audioVolume);
  }, []);

  const handleClickMuteAudioToggle = useCallback(() => {
    Howler.volume(isMuteAudio ? currentAudioVolume : 0);
    setIsMuteAudio(!isMuteAudio);
  }, [currentAudioVolume, isMuteAudio]);

  const handleCloseOkusuriLand = useCallback(
    () => setIsOpenOkusuriLand(false),
    []
  );

  const handleCloseSettings = useCallback(() => setIsOpenSettings(false), []);

  const handleClickOpenOkusuriLand = useCallback(
    () => setIsOpenOkusuriLand(true),
    []
  );

  const handleClickOpenSettings = useCallback(
    () => setIsOpenSettings(true),
    []
  );

  // Render

  return (
    <>
      <div
        className="fixed flex"
        css={css`
          ${menu};
          ${isOpenOkusuriLand || isOpenSettings ? fadeOut : fadeIn}
        `}
      >
        <div className="flex" css={menuGroup}>
          <img
            alt="おくすりランド"
            onClick={handleClickOpenOkusuriLand}
            src="/exhibition/book.svg"
          />
        </div>

        <div className="flex" css={menuGroup}>
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
      </div>
      {isOpenOkusuriLand && <OkusuriLand onClose={handleCloseOkusuriLand} />}
      {isOpenSettings && (
        <Settings
          currentAudioVolume={currentAudioVolume}
          onChangeAudioVolume={handleChangeAudioVolume}
          onClose={handleCloseSettings}
        />
      )}
    </>
  );
};
