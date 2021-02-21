import { useCallback, useEffect, useState } from "react";

export const useScreenOrientation = () => {
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "landscape"
  );

  const handleResize = useCallback(() => {
    if (window.innerWidth < window.innerHeight) {
      setOrientation("portrait");
    } else {
      setOrientation("landscape");
    }
  }, []);

  useEffect(() => {
    addEventListener("resize", handleResize, true);
    handleResize();

    return () => {
      removeEventListener("resize", handleResize, true);
    };
  }, []);

  return {
    orientation,
  };
};
