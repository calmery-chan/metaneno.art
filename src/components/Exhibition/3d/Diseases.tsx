import { css, keyframes } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Colors } from "~/styles/colors";
import { Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";
import { Disease } from "~/utils/okusuri.land/types";

// Animations

const fadeInUpKeyframes = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeInUp = css`
  animation: ${fadeInUpKeyframes} 0.8s ease forwards;
`;

const fadeOutDownKeyframes = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
`;

const fadeOutDown = css`
  animation: ${fadeOutDownKeyframes} ${Mixin.ANIMATION_DURATION.seconds}s ease
    forwards;
`;

// Styles

const container = css`
  background: rgba(240, 240, 240, 1);
  color: ${Colors.black};
  margin: 0 ${Spacing.m}px ${Spacing.m}px 0;
  padding: ${Spacing.m}px;
  width: 256px;
`;

const diseaseDescription = css`
  ${Typography.XS};
`;

const diseaseName = css`
  ${Typography.M};
`;

const medicine = css`
  margin-top: ${Spacing.s}px;
`;

const medicineDescription = css`
  ${Typography.XS};
`;

const medicineImage = css`
  margin-right: ${Spacing.xs}px;
  height: 48px;
  width: 48px;
`;

const medicineName = css`
  ${Typography.S};
`;

export const Exhibition3dDiseases = React.memo<{
  diseases: Disease[];
}>(() => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 3600);
  }, []);

  return (
    <div
      className="bottom-0 box-border fixed right-0"
      css={css`
        ${container};
        ${isVisible ? fadeInUp : fadeOutDown}
      `}
    >
      <div css={diseaseName}>ノネメ欠乏症</div>
      <div css={diseaseDescription}>
        ノネメちゃんが不足しています。今すぐに会いに行きましょう。
      </div>
      <div className="flex" css={medicine}>
        <div className="flex-shrink-0" css={medicineImage}>
          <img className="h-full object-contain w-full" src="/medicine.jpg" />
        </div>
        <div>
          <div css={medicineName}>ノネメちゃんのおくすり</div>
          <div css={medicineDescription}>ノネメちゃんのおくすりです。</div>
        </div>
      </div>
      <div className="flex" css={medicine}>
        <div className="flex-shrink-0" css={medicineImage}>
          <img className="h-full object-contain w-full" src="/medicine.jpg" />
        </div>
        <div>
          <div css={medicineName}>ノネメちゃんの毒入りおくすり</div>
          <div css={medicineDescription}>
            ノネメちゃんからのプレゼント！飲んでみよう。
          </div>
        </div>
      </div>
    </div>
  );
});
