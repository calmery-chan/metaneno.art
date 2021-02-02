import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dItems = React.memo<{ step: number }>(({ step }) => {
  return (
    <Exhibition2dObject step={step} x={520} url="/exhibition/items/key.png" />
  );
});
