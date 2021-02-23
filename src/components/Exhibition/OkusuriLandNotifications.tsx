import { css, keyframes } from "@emotion/react";
import React, { useEffect } from "react";
import { Colors } from "~/styles/colors";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { Disease } from "~/utils/okusuri.land/types";

const ellipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 126px;
`;

const description = css`
  ${ellipsis};
  ${Typography.S};
`;

const diseaseInformation = css`
  padding-top: ${Spacing.s}px;
`;

const medicineInformation = css`
  padding-top: ${Spacing.s}px;
`;

const medicineInformationIcon = css`
  image-rendering: pixelated;
  height: 30px;
  padding-right: ${Spacing.s}px;
`;

const name = css`
  ${ellipsis};
  ${Typography.S};
`;

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
  border-radius: 2px;
  color: ${Colors.black};
  padding: ${Spacing.m}px;
  width: 196px;
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
        // onAnimationCompleted();
      }, 4000);
    }
  }, [diseases, onAnimationCompleted]);

  return (
    <div className="absolute grid" css={notifications}>
      {diseases.map((disease) => (
        <div className="bg-white" css={notification} key={disease.id}>
          <div css={Typography.S}>おくすりを貰いました！</div>
          <div css={diseaseInformation}>
            <div>
              <div css={name}>{disease.name}</div>
              <div css={description}>{disease.description}</div>
            </div>
            {disease.medicines.map((medicine, index) => (
              <div className="flex" css={medicineInformation} key={index}>
                <img src={medicine.icon.url} css={medicineInformationIcon} />
                <div>
                  <div css={name}>{medicine.name}</div>
                  <div css={description}>{medicine.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
});
