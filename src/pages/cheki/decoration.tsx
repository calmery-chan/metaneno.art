import { NextPage } from "next";
import React, { useCallback } from "react";
import { ChekiColorPicker } from "~/components/Cheki/ColorPicker";
import { ChekiColumn } from "~/components/Cheki/Column";
import { ChekiFlexColumn } from "~/components/Cheki/FlexColumn";
import { ChekiHeader } from "~/components/Cheki/Header";
import { CHEKI_DECORATION_COLORS } from "~/constants/cheki";
import { ChekiApp } from "~/containers/Cheki/App";
import { ChekiCanvas } from "~/containers/Cheki/Canvas";
import { ChekiCanvasContainer } from "~/containers/Cheki/CanvasContainer";
import { ChekiCanvasFrames } from "~/containers/Cheki/CanvasFrames";
import { ChekiNavigation } from "~/containers/Cheki/Navigation";
import { selectors, useDispatch, useSelector } from "~/domains";
import { actions } from "~/domains/cheki";
import { Hex } from "~/domains/cheki/models";

const Decoration: NextPage = () => {
  const { decoration } = useSelector(selectors.cheki);
  const dispatch = useDispatch();

  // Events

  const handleOnChangeColor = useCallback(
    (hex: Hex) => dispatch(actions.changeDecorationColor({ hex })),
    []
  );

  // Render

  return (
    <ChekiApp>
      <ChekiFlexColumn>
        <ChekiHeader />
        <ChekiCanvasContainer>
          <ChekiCanvas>
            <ChekiCanvasFrames />
          </ChekiCanvas>
        </ChekiCanvasContainer>
        <ChekiColumn>
          <ChekiColorPicker
            colors={CHEKI_DECORATION_COLORS}
            onChange={handleOnChangeColor}
          />
          <div>Current: {decoration.hex}</div>
        </ChekiColumn>
        <ChekiNavigation />
      </ChekiFlexColumn>
    </ChekiApp>
  );
};

export default Decoration;
