import { useEffect } from "react";

export const useKeydown = (handleKeydown: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    return () => removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);
};

export const useKeyup = (handleKeyup: (event: KeyboardEvent) => void) => {
  useEffect(() => {
    addEventListener("keyup", handleKeyup);
    return () => removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);
};
