import { Howl } from "howler";
import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
  const [audio, setAudio] = useState<Howl>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const audio = new Howl({
      preload: true,
      src: [url],
    });

    // Events

    audio.once("load", () => setAudio(audio));
    audio.once("loaderror", () => setError(new Error()));
  }, [url]);

  return { audio, error };
};
