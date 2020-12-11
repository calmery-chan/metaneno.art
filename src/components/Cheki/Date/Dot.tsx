import React from "react";
import { Hex } from "~/domains/cheki/models";

export const ChekiDateDot: React.FC<{ color: Hex }> = ({ color }) => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 8 24"
    width="8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect fill={color} height="4" width="4" x="2" y="20" />
  </svg>
);
