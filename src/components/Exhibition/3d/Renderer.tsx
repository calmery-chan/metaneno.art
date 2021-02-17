import React, { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { sRGBEncoding } from "three";
import { getDevicePixelRatio } from "~/utils/exhibition";

export const Exhibition3dRenderer = React.memo(() => {
  const { gl } = useThree();

  useEffect(() => {
    gl.outputEncoding = sRGBEncoding;
    gl.setPixelRatio(getDevicePixelRatio("high"));
    gl.shadowMap.autoUpdate = false;
  }, []);

  return null;
});
