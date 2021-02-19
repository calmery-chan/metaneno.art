import { useCallback, useEffect, useState } from "react";
import { examine, getPatient, postCredential } from "./api";
import {
  firebase,
  getCredential,
  getToken,
  logIn,
  logOut,
} from "./authentication";
import { Patient } from "./types";

// Main

export const useOkusuriLand = () => {
  const [busy, setBusy] = useState(false);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Side Effects

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (!user) {
        setPatient(null);
        setToken(null);
        return;
      }

      setToken(await getToken(user));
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setPatient(null);
      return;
    }

    (async () => {
      setBusy(true);

      const credential = await getCredential();

      setPatient(
        await (credential
          ? postCredential(credential, token)
          : getPatient(token))
      );

      setBusy(false);
    })();
  }, [token]);

  return {
    busy,
    examine: useCallback(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (key: string, value: number) => examine(token!, key, value),
      [token]
    ),
    logIn,
    logOut,
    patient,
  };
};
