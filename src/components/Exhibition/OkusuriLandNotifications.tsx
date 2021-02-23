import { css, keyframes } from "@emotion/react";
import React, { useEffect } from "react";
import { Spacing } from "~/styles/spacing";
import { Disease } from "~/utils/okusuri.land/types";

const notificationKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  10%, 90% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
`;

const notification = css`
  animation: ${notificationKeyframes} 4s ease forwards;
  padding: ${Spacing.m}px;
`;

const notifications = css`
  gap: ${Spacing.s}px;
  left: ${Spacing.m}px;
  top: ${Spacing.m}px;
  z-index: 1000;
`;

export const ExhibitionOkusuriLandNotifications = React.memo<{
  diseases: Disease[];
  onAnimationCompleted: () => void;
}>(({ diseases, onAnimationCompleted }) => {
  useEffect(() => {
    if (diseases.length) {
      setTimeout(() => {
        onAnimationCompleted();
      }, 4000);
    }
  }, [diseases, onAnimationCompleted]);

  return (
    <div className="absolute grid" css={notifications}>
      {diseases.map((disease) => (
        <div className="bg-white" css={notification} key={disease.id}>
          notification 1
        </div>
      ))}
    </div>
  );
});
