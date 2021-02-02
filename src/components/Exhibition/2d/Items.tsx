import React from "react";
import { Exhibition2dObject } from "./Object";

export const Exhibition2dItems = React.memo<{
  restricted: boolean;
  step: number;
}>((props) => {
  return (
    <Exhibition2dObject {...props} x={520} url="/exhibition/items/key.png" />
  );
});
