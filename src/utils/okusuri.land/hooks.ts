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
import { Department, Disease, PatientRecord } from "./types";

// Main

export const useOkusuriLand = (handleChange: (diseases: Disease[]) => void) => {
  const [busy, setBusy] = useState(true);
  const [department, setDepartment] = useState<Department | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [error, setError] = useState<Error>();
  const [record, setRecord] = useState<PatientRecord | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Events

  const refresh = useCallback(async () => {
    if (!department || !token) {
      setRecord(null);
      return;
    }

    try {
      setBusy(true);

      const credential = await getCredential();
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
  }, [department, token]);

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

    (async () => {
      const department = await getDepartment();
      setDepartment(department);
    })();
  }, []);

  useEffect(() => {
    refresh();
  }, [department, token]);

  const handleExamine = useCallback(
    async (key: string, value: number) => {
      const { prescription } = await examine(token!, key, value);
      const { diseaseIds } = prescription;

      if (diseaseIds.length) {
        await refresh();
      }

      const diseases = department!.diseases.filter(({ id }) =>
        diseaseIds.includes(id)
      );

      handleChange(diseases);
    },
    [department, token]
  );

  return {
    busy,
    diseases,
    error,
    examine: handleExamine,
    logIn,
    logOut,
    record,
  };
};
