import { action } from "@storybook/addon-actions";
import React from "react";
import { ChekiInput } from "./ChekiInput";

export default {
  title: "Cheki/ChekiImageLoadButton",
};

export const Default = () => <ChekiInput onLoad={action("onLoad")} />;
