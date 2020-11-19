import styled from "@emotion/styled";
import React from "react";
import { selectors, useSelector } from "~/domains";

const Canvas = styled.svg`
  position: absolute;
`;

export const ChekiCanvas: React.FC = ({ children }) => {
  const { layout } = useSelector(selectors.cheki);
  const { displayable } = layout;

  return (
    <Canvas
      height={displayable.height}
      viewBox={`0 0 ${displayable.width} ${displayable.height}`}
      width={displayable.width}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {children}
    </Canvas>
  );
};
