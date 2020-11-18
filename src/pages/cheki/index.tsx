import { styled } from "linaria/react";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { SplashScreen } from "~/components/Cheki/SplashScreen";
import { ChekiSubButton } from "~/components/Cheki/SubButton";
import { ChekiTrimPreview } from "~/containers/Cheki/ChekiTrimPreview";
import { ChekiShootButton } from "~/containers/Cheki/ShootButton";
import { ChekiTrim } from "~/containers/Cheki/Trim";
import { useDispatch } from "~/domains";
import { actions } from "~/domains/cheki";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Camera: NextPage = () => {
  const dispatch = useDispatch();
  const [transition, setTransition] = useState<"camera" | "trim" | "preview">(
    "camera"
  );

  const handleOnLoadImage = useCallback((url: string) => {
    dispatch(actions.addImage({ url }));
    setTransition("trim");
  }, []);

  const handleOnClickShootButton = useCallback(
    () => setTransition("preview"),
    []
  );

  const handleOnClickShootAgainButton = useCallback(
    () => setTransition("trim"),
    []
  );

  return (
    <>
      <ChekiApp>
        <Container>
          <ChekiHeader />
          {transition === "camera" && (
            <ChekiInputImage onLoad={handleOnLoadImage} />
          )}
          {transition === "trim" && (
            <>
              <ChekiTrim />
              <ChekiColumn margin>
                <ChekiShootButton onClick={handleOnClickShootButton} />
              </ChekiColumn>
            </>
          )}
          {transition === "preview" && (
            <>
              <ChekiTrimPreview />
              <ChekiColumn margin>
                <ChekiSubButton onClick={handleOnClickShootAgainButton}>
                  もう一度撮影する
                </ChekiSubButton>
              </ChekiColumn>
            </>
          )}
          <ChekiNavigation active="camera" />
        </Container>
      </ChekiApp>

      <SplashScreen />
    </>
  );
};

export default Camera;
