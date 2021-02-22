import { Howl, HowlOptions } from "howler";
import { useEffect, useState } from "react";

export const useAudio = (
  url: string,
  options?: Omit<HowlOptions, "preload" | "src">
) => {
  const [audio, setAudio] = useState<Howl>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (audio) {
      audio.stop();
    }

    const newAudio = new Howl({
      ...options,
      preload: true,
      src: [
        `${
          process.env.NODE_ENV === "production"
            ? "https://assets.metaneno.art"
            : "http://localhost:8000"
        }${url}`,
      ],
    });

    // Events

    newAudio.once("load", () => setAudio(newAudio));
    newAudio.once("loaderror", () => setError(new Error()));
  }, [url]);

  useEffect(() => {
    if (!audio || !options || !options.volume) {
      return;
    }

    audio.volume(options.volume);
  }, [audio, options?.volume]);

  return { audio, error };
};
