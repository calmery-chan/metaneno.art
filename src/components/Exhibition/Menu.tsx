import { css } from "@emotion/react";
import { Howler } from "howler";
import { ChangeEvent, useCallback, useState } from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { useOkusuriLand } from "~/utils/okusuri.land";

// Styles

const container = css`
  color: ${Colors.black};
  padding: ${Spacing.m}px;
`;

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

const OkusuriLand: React.FC = () => {
  const { logIn, logOut, patient } = useOkusuriLand();

  if (!patient) {
    return <>Login</>;
  }

  return <>{patient.name}</>;
};

export const ExhibitionMenu: React.FC = () => {
  const { patient } = useOkusuriLand();
  const [currentAudioVolume, setCurrentAudioVolume] = useState(Howler.volume());
  const [isMuteAudio, setIsMuteAudio] = useState(false);
  const [isOpenOkusuriLand, setIsOpenOkusuriLand] = useState(false);
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

  const handleClickCloseOkusuriLand = useCallback(() => {
    setIsOpenOkusuriLand(false);
  }, []);

  const handleClickCloseSettings = useCallback(() => {
    setIsOpenSettings(false);
  }, []);

  const handleClickOpenOkusuriLand = useCallback(() => {
    setIsOpenOkusuriLand(true);
  }, []);

  const handleClickOpenSettings = useCallback(() => {
    setIsOpenSettings(true);
  }, []);

  // Render

  if (isOpenOkusuriLand) {
    return (
      <div
        className="bg-white bottom-0 fixed flex flex-col h-full left-0 right-0 top-0 w-full"
        css={container}
      >
        <div className="flex items-center w-full" css={header}>
          <div css={title}>おくすりランド</div>
          <div
            className="cursor-pointer ml-auto"
            onClick={handleClickCloseOkusuriLand}
          >
            <img src="/exhibition/close.svg" alt="閉じる" />
          </div>
        </div>
        <div className="overflow-scroll">
          <OkusuriLand />
        </div>
      </div>
    );
  }

  if (isOpenSettings) {
    return (
      <ExhibitionPopup onClose={handleClickCloseSettings}>
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
      </ExhibitionPopup>
    );
  }

  return (
    <div className="fixed flex" css={menu}>
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
  );
};
