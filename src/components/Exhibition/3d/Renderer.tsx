import React, { useEffect } from "react";
import { useThree } from "react-three-fiber";
import { sRGBEncoding } from "three";

export const Exhibition3dRenderer = React.memo(() => {
  const { gl } = useThree();

  useEffect(() => {
    gl.outputEncoding = sRGBEncoding;
    gl.setPixelRatio(window.devicePixelRatio);
    gl.shadowMap.autoUpdate = false;
  }, []);

  return null;
});
