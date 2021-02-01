import { useEffect } from "react";

export const useKeydown = (handleKeydown: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    return () => removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);
};
