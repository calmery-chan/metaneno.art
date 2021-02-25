import { useCallback, useEffect, useState } from "react";
import { Sentry } from "../sentry";
import {
  examine,
  forceExamine,
  getDepartment,
  getPatient,
  postCredential,
} from "./api";
import {
  firebase,
  getCredential,
  getToken,
  logIn,
  logOut,
} from "./authentication";
import { Department, Disease, PatientRecord } from "./types";

//

const KEY = "okusuri.land-symptoms";

const saveTemporary = (key: string, value: number) => {
  const symptoms = loadTemporary() || {};

  if (symptoms[key] === undefined) {
    symptoms[key] = 0;
  }

  symptoms[key] += value;

  localStorage.setItem(KEY, JSON.stringify(symptoms));
};

const loadTemporary = (): Record<string, number> | null => {
  const string = localStorage.getItem(KEY);

  if (!string) {
    return null;
  }

  try {
    return JSON.parse(string);
  } catch (_) {
    return null;
  }
};

const removeTemporary = () => {
  localStorage.removeItem(KEY);
};

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

      const symptoms = loadTemporary();

      if (symptoms) {
        const { prescription } = await forceExamine(token, symptoms);
        const { diseaseIds } = prescription;
        const diseases = department!.diseases.filter(({ id }) =>
          diseaseIds.includes(id)
        );
        removeTemporary();
        handleChange(diseases);
        if (diseaseIds.length) await refresh();
      }
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
      if (!token || !record) {
        saveTemporary(key, value);
        return;
      }

      const { prescription } = await examine(token, key, value);
      const { diseaseIds } = prescription;

      if (diseaseIds.length) {
        await refresh();
      }

      const diseases = department!.diseases.filter(({ id }) =>
        diseaseIds.includes(id)
      );

      handleChange(diseases);
    },
    [department, record, token]
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
