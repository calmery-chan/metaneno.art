import { useCallback, useEffect, useState } from "react";
import { Sentry } from "../sentry";
import { examine, getDepartment, getPatient, postCredential } from "./api";
import {
  firebase,
  getCredential,
  getToken,
  logIn,
  logOut,
} from "./authentication";
import { Disease, PatientRecord } from "./types";

// Main

export const useOkusuriLand = () => {
  const [busy, setBusy] = useState(true);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [error, setError] = useState<Error>();
  const [record, setRecord] = useState<PatientRecord | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Side Effects

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user: firebase.User | null) => {
      if (!user) {
        setBusy(false);
        setRecord(null);
        setToken(null);
        return;
      }

      setToken(await getToken(user));
      setBusy(false);
    });
  }, []);

  useEffect(() => {
    if (!token) {
      setRecord(null);
      return;
    }

    (async () => {
      try {
        setBusy(true);

        const credential = await getCredential();
        const department = await getDepartment();
        const patient = (await (credential
          ? postCredential(credential, token)
          : getPatient(token)))!;

        const diseaseIds = patient.diseases
          .filter(({ departmentId }) => departmentId === department.id)
          .map(({ diseaseId }) => diseaseId);

        const diseases = department.diseases.filter(({ id }) =>
          diseaseIds.includes(id)
        );

        setDiseases(diseases);
        setRecord(patient.record);
      } catch (error) {
        Sentry.captureException(error);
        setError(error);
      } finally {
        setBusy(false);
      }
    })();
  }, [token]);

  return {
    busy,
    diseases,
    error,
    examine: useCallback(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (key: string, value: number) => examine(token!, key, value),
      [token]
    ),
    logIn,
    logOut,
    record,
  };
};
