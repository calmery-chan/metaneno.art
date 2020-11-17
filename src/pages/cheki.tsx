import { styled } from "linaria/react";
import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiNavigation } from "~/components/Cheki/Navigation";
import { SplashScreen } from "~/components/Cheki/SplashScreen";
import { ChekiInput } from "~/components/ChekiInput";
import { Header } from "~/components/Header";
import { Page } from "~/components/Page";
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
      <Page>
        <Container>
          <Header />
          {url ? <ChekiCanvas /> : <ChekiInput onLoad={handleOnLoadImage} />}
          <ChekiNavigation active="camera" />
        </Container>
      </Page>

      <SplashScreen />
    </>
  );
};

export default Cheki;
