import { css } from "@emotion/react";
import React from "react";
import { Hex } from "~/domains/cheki/models";
import { Mixin } from "~/styles/mixin";

export const ChekiColorPicker: React.FC<{
  colors: Hex[];
  onChange: (color: Hex) => void;
}> = ({ colors, onChange }) => (
  <>
    {colors.map((color, key) => (
      <div
        css={css`
          ${Mixin.clickable};

          background: ${color};
          border-radius: 4px;
          height: 32px;
          width: 32px;
        `}
        key={key}
        onClick={() => onChange(color)}
      />
    ))}
  </>
);
