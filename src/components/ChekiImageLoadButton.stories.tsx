import { action } from "@storybook/addon-actions";
import React from "react";
import { ChekiImageLoadButton } from "./ChekiImageLoadButton";

export default {
  title: "Cheki/ChekiImageLoadButton",
};

export const Default = () => <ChekiImageLoadButton onLoad={action("onLoad")} />;
