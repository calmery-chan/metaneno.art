import { css } from "@emotion/react";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { isMobile } from "react-device-detect";
import { useKeyboard } from "~/hooks/exhibition/useKeyboard";
import { Spacing } from "~/styles/spacing";
import { Sentry } from "~/utils/sentry";

export type ControllerKeys = {
  down: boolean;
  left: boolean;
  right: boolean;
  up: boolean;
};

export const defaultControllerKeys = {
  down: false,
  left: false,
  right: false,
  up: false,
};

const mobileContainer = css`
  bottom: ${Spacing.l}px;
  left: ${Spacing.l}px;
`;

const Mobile = React.memo<{ onChange: (keys: ControllerKeys) => void }>(
  ({ onChange }) => {
    const [isMoving, setIsMoving] = useState(false);

    const handleTouchMove = useCallback((event: TouchEvent) => {
      event.preventDefault();
      // event.stopPropagation();

      // if (!isMoving) {
      //   return;
      // }

      console.log(event.touches);
    }, []);

    useLayoutEffect(() => {
      const e = document.querySelector("#exhibition-3d-canvas");

      try {
        e!.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
          e!.removeEventListener("touchmove", handleTouchMove);
        };
      } catch (error) {
        Sentry.captureException(error);
      }
    }, []);

    return null;
  }
);

const PC = React.memo<{ onChange: (keys: ControllerKeys) => void }>(
  ({ onChange }) => {
    const keys = useKeyboard();

    useEffect(() => {
      onChange(keys);
    }, [keys]);

    return null;
  }
);

export const Exhibition3dController = React.memo<{
  onChange: (keys: ControllerKeys) => void;
}>(({ onChange }) => {
  if (!isMobile) {
    return <PC onChange={onChange} />;
  }

  return <Mobile onChange={onChange} />;
});
