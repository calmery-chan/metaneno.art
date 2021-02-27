import styled from "@emotion/styled";
import { NextPage } from "next";
import React from "react";
import LoadingIcon from "../components/lp/LoadingIcon";
import MainVisual from "../components/lp/MainVisual";

const Index: NextPage = () => {
  return (
    <Wrapper>
      <MainVisual />
      <LoadingIcon />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
`;

export default Index;
