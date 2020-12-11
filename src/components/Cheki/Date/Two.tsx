import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateTwo: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 18 24"
    width="18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.254 10.512L14.622 12.024L13.014 13.488H4.83L3.462 12L5.094 10.512H13.254ZM1.422 22.92L0.75 22.176L1.614 12.24H3.006L3.102 12.36L4.446 13.824L3.846 20.688L1.422 22.92ZM3.702 0.743999L4.518 0H15.678L16.374 0.743999L13.95 2.976H5.742L3.702 0.743999ZM16.686 1.08L17.358 1.824L16.494 11.76H15.102L15.006 11.664L13.662 10.2L14.262 3.312L16.686 1.08ZM14.406 23.256L13.59 24H2.43L1.734 23.256L4.158 21.024H12.366L14.406 23.256Z"
      fill={color}
    />
  </svg>
);
