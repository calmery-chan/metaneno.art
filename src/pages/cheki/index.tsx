import styled from "@emotion/styled";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiTrimPreview } from "~/containers/Cheki/ChekiTrimPreview";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { ChekiShootButton } from "~/containers/Cheki/ShootButton";
import { SplashScreen } from "~/containers/Cheki/SplashScreen";
import { ChekiTrim } from "~/containers/Cheki/Trim";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Cheki: NextPage = () => {
  const dispatch = useDispatch();
  const { shootingCondition } = useSelector(selectors.cheki);

  // Events

  const handleOnLoadImage = useCallback((url: string) => {
    dispatch(actions.addImage({ url }));
    dispatch(
      actions.changeShootingCondition({ shootingCondition: "trimming" })
    );
  }, []);

  const handleOnClickShootButton = useCallback(
    () =>
      dispatch(
        actions.changeShootingCondition({ shootingCondition: "complate" })
      ),
    []
  );

  const handleOnClickShootAgainButton = useCallback(
    () =>
      dispatch(
        actions.changeShootingCondition({ shootingCondition: "trimming" })
      ),
    []
  );

  // Render

  return (
    <>
      <ChekiApp
        seoProps={{
          nofollow: false,
          noindex: false,
        }}
      >
        <Container>
          <ChekiHeader />
          {shootingCondition === "in-preparation" && (
            <ChekiInputImage onLoad={handleOnLoadImage} />
          )}
          {shootingCondition === "trimming" && (
            <>
              <ChekiTrim />
              <ChekiColumn margin>
                <ChekiShootButton onClick={handleOnClickShootButton} />
              </ChekiColumn>
            </>
          )}
          {shootingCondition === "complate" && (
            <>
              <ChekiTrimPreview />
              <ChekiColumn margin>
                <ChekiSubButton onClick={handleOnClickShootAgainButton}>
                  もう一度撮影する
                </ChekiSubButton>
              </ChekiColumn>
            </>
          )}
          <ChekiNavigation />
        </Container>
      </ChekiApp>

      <SplashScreen />
    </>
  );
};

export default Cheki;
