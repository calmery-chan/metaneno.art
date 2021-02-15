import { Howl, HowlOptions } from "howler";
import { useEffect, useState } from "react";

export const useAudio = (
  url: string,
  options?: Omit<HowlOptions, "preload" | "src">
) => {
  const [audio, setAudio] = useState<Howl>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    const audio = new Howl({
      ...options,
      preload: true,
      src: [url],
    });

    // Events

    audio.once("load", () => setAudio(audio));
    audio.once("loaderror", () => setError(new Error()));
  }, [url]);

  useEffect(() => {
    if (!audio || !options || !options.volume) {
      return;
    }

    audio.volume(options.volume);
  }, [audio, options?.volume]);

  return { audio, error };
};
