import React, { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { sRGBEncoding } from "three";
import { GraphicsQuality } from "~/types/exhibition";
import { getDevicePixelRatio } from "~/utils/exhibition";

export const Exhibition3dRenderer = React.memo<{
  graphicsQuality: GraphicsQuality;
}>(({ graphicsQuality }) => {
  const { gl } = useThree();

  useEffect(() => {
    gl.outputEncoding = sRGBEncoding;
    gl.shadowMap.autoUpdate = false;
  }, []);

  useEffect(() => {
    gl.setPixelRatio(getDevicePixelRatio(graphicsQuality));
  }, [graphicsQuality]);

  return null;
});
