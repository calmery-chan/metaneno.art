import { NextPage } from "next";
import React from "react";

const AugmentedReality: NextPage = () => {
  return <div>{window && window.location.search}</div>;
};

export default AugmentedReality;
