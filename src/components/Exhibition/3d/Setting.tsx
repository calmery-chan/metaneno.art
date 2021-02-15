import { Howler } from "howler";
import React, { useCallback } from "react";

export const Exhibition3dSetting: React.FC = () => {
  const handleChangeAudioVolume = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.currentTarget.value);
      Howler.volume(value);
    },
    []
  );

  return (
    <>
      <input
        defaultValue="1"
        max="1"
        min="0"
        onChange={handleChangeAudioVolume}
        step="0.05"
        type="range"
      />
    </>
  );
};
