import { useCallback, useEffect, useState } from "react";

export const useKeyboard = () => {
  const [down, setDown] = useState(false);
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [up, setUp] = useState(false);

  const handleKeydown = useCallback(({ code }: KeyboardEvent) => {
    if (code === "ArrowDown" || code === "KeyS") setDown(true);
    if (code === "ArrowLeft" || code === "KeyA") setLeft(true);
    if (code === "ArrowRight" || code === "KeyD") setRight(true);
    if (code === "ArrowUp" || code === "KeyW") setUp(true);
  }, []);

  const handleKeyup = useCallback(({ code }: KeyboardEvent) => {
    if (code === "ArrowDown" || code === "KeyS") setDown(false);
    if (code === "ArrowLeft" || code === "KeyA") setLeft(false);
    if (code === "ArrowRight" || code === "KeyD") setRight(false);
    if (code === "ArrowUp" || code === "KeyW") setUp(false);
  }, []);

  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    addEventListener("keyup", handleKeyup);

    return () => {
      removeEventListener("keydown", handleKeydown);
      removeEventListener("keyup", handleKeyup);
    };
  }, []);

  return {
    down,
    left,
    right,
    up,
  };
};
