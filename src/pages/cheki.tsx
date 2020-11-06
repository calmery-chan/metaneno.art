import { NextPage } from "next";
import React from "react";
import { ChekiImageLoadButton } from "~/components/ChekiImageLoadButton";
import { selectors, useDispatch, useSelector } from "~/domains";

const Cheki: NextPage = () => {
  const cheki = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto">
      <div className="mx-4">
        <ChekiImageLoadButton onLoad={(image) => console.log(image)} />
      </div>
    </div>
  );
};

export default Cheki;
