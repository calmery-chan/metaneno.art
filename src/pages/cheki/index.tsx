import { css } from "@emotion/react";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiLogo } from "~/components/Cheki/Logo";
import { SPLASH_SCREEN_DURATION } from "~/constants/cheki";
import { ChekiCamera } from "~/containers/Cheki/Camera";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiApp } from "~/containers/Cheki/Refactor/App";

import { useDispatch, useSelector } from "~/domains";
import { actions, selectors } from "~/domains/cheki";
import { Colors } from "~/styles/colors";
import { fadeOut, Mixin } from "~/styles/mixin";
import { Spacing } from "~/styles/spacing";
import { Typography } from "~/styles/typography";

// Styles

const splashAnimation = css`
  ${Mixin.animation};
  ${fadeOut};
`;

const splashComment = css`
  ${Typography.XS};

  bottom: ${Spacing.l}px;
  color: ${Colors.black};
`;

const splashHeart = css`
  display: inline-block;
  vertical-align: middle;
`;

// Components

export const Cheki: NextPage = () => {
  const dispatch = useDispatch();
  const splashed = useSelector(selectors.splashed);

  const [fire, setFire] = useState(false);

  // Side Effects

  useEffect(() => {
    setTimeout(() => setFire(true), SPLASH_SCREEN_DURATION);
  }, []);

  useEffect(() => {
    if (fire) {
      setTimeout(
        () => dispatch(actions.splashed()),
        Mixin.ANIMATION_DURATION.milliseconds
      );
    }
  }, [fire]);

  // Render

  return (
    <>
      <ChekiApp
        seoProps={{
          nofollow: false,
          noindex: false,
        }}
      >
        <ChekiFlexColumn>
          <ChekiHeader />
          <ChekiCamera />
          <ChekiNavigation />
        </ChekiFlexColumn>
      </ChekiApp>

      {!splashed && (
        <div css={fire ? splashAnimation : undefined}>
          <ChekiApp className="bottom-0 flex items-center justify-center left-0 right-0 top-0">
            <ChekiLogo size={256} />
            <div className="absolute font-bold" css={splashComment}>
              Made with <img css={splashHeart} src="/cheki/heart.svg" /> by
              めたねのおくすり
            </div>
          </ChekiApp>
        </div>
      )}
    </>
  );
};

export default Cheki;
