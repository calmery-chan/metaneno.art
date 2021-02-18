import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { useOkusuriLand } from "~/utils/okusuri.land";
import { Disease } from "~/utils/okusuri.land/types";

const ExhibitionLogin: NextPage = () => {
  const { authenticate, busy, examine, patient } = useOkusuriLand();
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [key, setKey] = useState("");
  const [value, setValue] = useState(1.0);

  // Events

  const handleChangeKey = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKey(event.currentTarget.value);
    },
    []
  );

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(parseFloat(event.currentTarget.value));
    },
    []
  );

  const handleClickExamine = useCallback(async () => {
    const { diseases } = await examine(key, value);

    if (!diseases.length) {
      return;
    }

    setDiseases(diseases);
  }, [examine, key, value]);

  // Render

  if (busy) {
    return <div>Processing...</div>;
  }

  if (patient) {
    return (
      <div>
        {patient.name}
        <input defaultValue={key} onChange={handleChangeKey} type="text" />
        <input
          defaultValue={value}
          onChange={handleChangeValue}
          type="number"
        />
        <button onClick={handleClickExamine}>Examine</button>
        <div>
          {diseases.map((disease) => (
            <div key={disease.name}>
              <div>{disease.name}</div>
              <div>{disease.description}</div>
              <div>
                {disease.medicines.map((medicine) => (
                  <div key={medicine.name}>
                    <div>{medicine.name}</div>
                    <div>{medicine.description}</div>
                    <div>
                      <img src={medicine.icon.url} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
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
