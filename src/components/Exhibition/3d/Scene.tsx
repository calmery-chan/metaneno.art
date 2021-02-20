import React, { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useThree } from "react-three-fiber";
import { Scene } from "three";

export const Exhibition3dScene = React.memo<{
  onClick?: () => void;
  scene?: Scene;
}>(({ onClick, scene }) => {
  const [hover, setHover] = useState(false);
  const { gl } = useThree();

  const handlePointerOver = useCallback(() => setHover(true), []);
  const handlePointerOut = useCallback(() => setHover(false), []);

  // Side Effects

  useEffect(() => {
    if (isMobile || !onClick) {
      return;
    }

    gl.domElement.style.cursor = hover ? "pointer" : "auto";
  }, [hover, onClick]);

  // Render

  if (!scene) {
    return null;
  }

  return (
    <primitive
      object={scene}
      onClick={onClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    />
  );
});
