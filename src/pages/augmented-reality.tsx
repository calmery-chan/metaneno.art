import { NextPage } from "next";
import React, { useEffect, useState } from "react";

const AugmentedReality: NextPage = () => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  return <div>{search}</div>;
};

export default AugmentedReality;
