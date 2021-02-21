import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<
    "portrait" | "landscape" | null
  >(null);

  const handleOrientation = useCallback(() => {
    switch (window.screen.orientation.type) {
      case "landscape-primary":
      case "landscape-secondary":
        return setOrientation("landscape");

      case "portrait-primary":
      case "portrait-secondary":
        return setOrientation("portrait");
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      return;
    }

    addEventListener("orientationchange", handleOrientation, true);
    handleOrientation();

    return () => {
      removeEventListener("orientationchange", handleOrientation, true);
    };
  }, []);

  return {
    isMobile,
    orientation,
  };
};
