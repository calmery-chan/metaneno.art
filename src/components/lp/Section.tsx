import React from "react";
import Content from "./Content";
import Credit from "./Credit";
import Footer from "./Footer";
import Goods from "./Goods";
import Illust from "./Illust";
import Share from "./Share";
import Story from "./Story";

export default function Section() {
  return (
    <>
      <Story />
      <Goods />
      <Content />
      <Illust />
      <Credit />
      <Share />
      <Footer />
    </>
  );
}
