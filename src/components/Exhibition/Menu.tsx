import { css } from "@emotion/react";
import { Howler } from "howler";
import React, { useCallback, useEffect, useState } from "react";
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

const loadSettings = ():
  | Partial<{
      audioVolume: number;
      graphicsQuality: string;
      muted: boolean;
    }>
  | undefined => {
  const string = localStorage.getItem("exhibition-settings");

  if (!string) {
    return;
  }

  try {
    const json = JSON.parse(string);
    return json;
  } catch (_) {
    return;
  }
};

const saveSettings = (
  value: Partial<{
    audioVolume: number;
    graphicsQuality: string;
    muted: boolean;
  }>
) => {
  const json = loadSettings() || {};

  localStorage.setItem(
    "exhibition-settings",
    JSON.stringify({
      ...json,
      ...value,
    })
  );
};

export const ExhibitionMenu: React.FC = () => {
  const [currentAudioVolume, setCurrentAudioVolume] = useState(Howler.volume());
  const [currentGraphicsQuality, setCurrentGraphicsQuality] = useState<
    "high" | "low" | "middle"
  >("high");
  const [muted, setMuted] = useState(false);
  const [isOpenOkusuriLand, setIsOpenOkusuriLand] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  // Events

  const handleChangeAudioVolume = useCallback((audioVolume: number) => {
    Howler.volume(audioVolume);
    saveSettings({ audioVolume });
    setCurrentAudioVolume(audioVolume);
  }, []);

  const handleChangeGraphicsQuality = useCallback(
    (graphicsQuality: "high" | "low" | "middle") => {
      saveSettings({ graphicsQuality });
      setCurrentGraphicsQuality(graphicsQuality);
    },
    []
  );

  const handleClickMuteAudioToggle = useCallback(() => {
    Howler.volume(muted ? currentAudioVolume : 0);
    saveSettings({ muted });
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

  // Side Effects

  useEffect(() => {
    const settings = loadSettings();

    if (!settings) {
      return;
    }

    const { audioVolume, graphicsQuality, muted } = settings;

    if (audioVolume && !isNaN(audioVolume)) {
      setCurrentAudioVolume(audioVolume);
    }

    if (
      graphicsQuality &&
      (graphicsQuality === "high" ||
        graphicsQuality === "low" ||
        graphicsQuality === "middle")
    ) {
      setCurrentGraphicsQuality(graphicsQuality);
    }

    if (muted) {
      setMuted(!!muted);
    }
  }, []);

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
          currentGraphicsQuality={currentGraphicsQuality}
          muted={muted}
          onChangeAudioVolume={handleChangeAudioVolume}
          onChangeGraphicsQuality={handleChangeGraphicsQuality}
          onClickMuteToggle={handleClickMuteAudioToggle}
          onClose={handleCloseSettings}
        />
      )}
    </>
  );
};
