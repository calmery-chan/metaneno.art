import confetti from "canvas-confetti";
import { useEffect } from "react";

const fire = (ratio: number, options?: Record<string, number>) =>
  confetti({
    ...options,
    origin: { y: 0.7 },
    particleCount: Math.floor(200 * ratio),
  });

export const ChekiConfetti: React.FC = () => {
  useEffect(() => {
    // Reference: https://www.kirilv.com/canvas-confetti/#realistic
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return null;
};
