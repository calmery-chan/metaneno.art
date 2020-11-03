import React from "react";
import { InstaxImageHorizontal } from "./InstaxImageHorizontal";
import { InstaxImageVertical } from "./InstaxImageVertical";

type InstaxImageProps = {
  direction: "horizontal" | "vertical";
  height: number;
  url: string;
  width: number;
  x: number;
  y: number;
};

export const InstaxImage: React.FC<InstaxImageProps> = (props) => (
  <>
    {props.direction === "horizontal" && <InstaxImageHorizontal {...props} />}
    {props.direction === "vertical" && <InstaxImageVertical {...props} />}
  </>
);
