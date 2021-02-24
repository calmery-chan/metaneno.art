import React from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";

export const Multiplay: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  return (
    <ExhibitionPopup onClose={onClose} label="マルチプレイ"></ExhibitionPopup>
  );
};
