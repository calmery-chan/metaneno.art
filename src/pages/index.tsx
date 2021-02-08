import styled from "@emotion/styled";
import { NextPage } from "next";
import React from "react";
import { Exhibition3dWork } from "~/components/Exhibition/3d/Work";

const Home: NextPage = () => {
  return <Exhibition3dWork />;
};

const Wrapper = styled.div`
  overflow: hidden;
`;

export default Home;
