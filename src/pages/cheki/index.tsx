import { styled } from "linaria/react";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiApp } from "~/components/Cheki/App";
import { ChekiHeader } from "~/components/Cheki/Header";
import { ChekiInputImage } from "~/components/Cheki/InputImage";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { SplashScreen } from "~/components/Cheki/SplashScreen";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Cheki: NextPage = () => {
  const dispatch = useDispatch();
  const {
    image: { url },
  } = useSelector(selectors.cheki);

  const handleOnLoadImage = useCallback(
    (url: string) => dispatch(actions.addImage({ url })),
    []
  );

  return (
    <>
      <ChekiApp>
        <Container>
          <ChekiHeader />
          {url ? (
            <ChekiCanvas />
          ) : (
            <ChekiInputImage onLoad={handleOnLoadImage} />
          )}
          <ChekiNavigation active="camera" />
        </Container>
      </ChekiApp>

      <SplashScreen />
    </>
  );
};

export default Cheki;
