import { css } from "@emotion/react";
import { Howler } from "howler";
import React, { useCallback, useState } from "react";
import { Settings } from "./Menu/Settings";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";

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

// Main

const OkusuriLand: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return <ExhibitionPopup onClose={onClose}>Okusuri.land</ExhibitionPopup>;
};

export const ExhibitionMenu: React.FC = () => {
  const [currentAudioVolume, setCurrentAudioVolume] = useState(Howler.volume());
  const [currentGraphics, setCurrentGraphics] = useState<
    "high" | "low" | "middle"
  >("high");
  const [muted, setMuted] = useState(false);
  const [isOpenOkusuriLand, setIsOpenOkusuriLand] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // Events

  const handleChangeAudioVolume = useCallback((audioVolume: number) => {
    Howler.volume(audioVolume);
    setCurrentAudioVolume(audioVolume);
  }, []);

  const handleChangeGraphics = useCallback(
    (graphics: "high" | "low" | "middle") => {
      setCurrentGraphics(graphics);
    },
    []
  );

  const handleClickMuteAudioToggle = useCallback(() => {
    Howler.volume(muted ? currentAudioVolume : 0);
    setMuted(!muted);
  }, [currentAudioVolume, muted]);

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
            src={`/exhibition/audio-${muted ? "off" : "on"}.svg`}
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
          currentGraphics={currentGraphics}
          muted={muted}
          onChangeAudioVolume={handleChangeAudioVolume}
          onChangeGraphics={handleChangeGraphics}
          onClickMuteToggle={handleClickMuteAudioToggle}
          onClose={handleCloseSettings}
        />
      )}
    </>
  );
};
