import React from "react";
import { ExhibitionPopup } from "~/components/Exhibition/Popup";
import { useOkusuriLand } from "~/utils/okusuri.land";

export const OkusuriLand: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { logIn, logOut, patient } = useOkusuriLand();

  return (
    <ExhibitionPopup onClose={onClose} label="おくすりランド">
      {patient && <>{patient.name}</>}
      {!patient && <button onClick={logIn}></button>}
    </ExhibitionPopup>
  );
};
