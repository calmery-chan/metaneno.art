import React from "react";
import { ChekiCanvasFrameEffectLayer } from "./CanvasFrameEffectLayer";
import { ChekiCanvasFrameLayer } from "./CanvasFrameLayer";
import { ChekiCanvasImageLayer } from "./CanvasImageLayer";
import { ChekiCanvasFramedImage } from "./Refactor/CanvasFramedImage";

export const ChekiCanvasFrames: React.FC = () => (
  <ChekiCanvasFramedImage>
    <ChekiCanvasFrameLayer />
    <ChekiCanvasImageLayer />
    <ChekiCanvasFrameEffectLayer />
  </ChekiCanvasFramedImage>
);
