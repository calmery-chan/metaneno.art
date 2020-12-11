import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ChekiColorPicker } from "~/components/Cheki/ColorPicker";
import { CHEKI_DECORATION_COLORS } from "~/constants/cheki";
import { Hex } from "~/domains/cheki/models";

const Decoration: NextPage = () => {
  const [hex, setHex] = useState<Hex>(CHEKI_DECORATION_COLORS[0]);

  // Events

  const handleOnChangeColor = useCallback((hex: Hex) => setHex(hex), []);

  // Render

  return (
    <div>
      <ChekiColorPicker
        colors={CHEKI_DECORATION_COLORS}
        onChange={handleOnChangeColor}
      />
      <div>Current: {hex}</div>
    </div>
  );
};

export default Decoration;
