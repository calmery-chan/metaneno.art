import { NextPage } from "next";
import React, { useCallback } from "react";
import { useOkusuriLand } from "~/utils/okusuri.land";

const ExhibitionLogin: NextPage = () => {
  const { authenticate, busy, examine, patient } = useOkusuriLand();

  // Events

  const handleClickExamine = useCallback(async () => {
    const { diseases } = await examine("DUMMY", 1.0);

    if (!diseases.length) {
      return;
    }

    console.log(diseases);
  }, [examine]);

  // Render

  if (busy) {
    return <div>Processing...</div>;
  }

  if (patient) {
    return (
      <div>
        {patient.name}
        <button onClick={handleClickExamine}>Examine</button>
      </div>
    );
  }

  return (
    <>
      <button onClick={authenticate}>Log In</button>
    </>
  );
};

export default ExhibitionLogin;
