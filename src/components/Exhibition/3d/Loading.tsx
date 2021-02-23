import React, { useEffect, useState } from "react";
import { fadeIn, fadeOut } from "~/styles/animations";
import { Mixin } from "~/styles/mixin";

export const Exhibition3dLoading = React.memo<{ isLoading: boolean }>(
  ({ isLoading }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [timer, setTimer] = useState<number | null>(null);

    useEffect(() => {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      if (isLoading) {
        setIsVisible(true);
      } else {
        setTimer(
          window.setTimeout(() => {
            setIsVisible(false);
          }, Mixin.ANIMATION_DURATION.milliseconds)
        );
      }
    }, [isLoading]);

    if (!isVisible) {
      return null;
    }

    return (
      <div
        className="bg-white bottom-0 fixed h-full left-0 right-0 top-0 w-full"
        css={isLoading ? fadeIn : fadeOut}
      />
    );
  }
);
