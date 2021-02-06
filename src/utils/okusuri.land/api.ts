import _axios from "axios";
import { Credential } from "./authentication";
import { Patient, Prescription } from "./types";

// Axios

const axios = _axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://okusuri.land/api/"
      : "http://localhost:8000/api/",
});

const getHeaders = (token: string) => ({
  headers: {
    Authorization: `Token ${token}`,
  },
});

// Types

type ApiResponse<T> = {
  data: T;
};

// Functions

export const examine = async (token: string, key: string, value: number) => {
  const { data } = await axios.post<
    ApiResponse<{
      prescription: Prescription;
    }>
  >(
    `/departments/${process.env.NEXT_PUBLIC_OKUSURI_LAND_DEPARTMENT_ID}`,
    {
      symptoms: {
        [key]: value,
      },
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );

  return data.data.prescription;
};

export const getPatient = async (token: string): Promise<Patient | null> => {
  const { data } = await axios.get<ApiResponse<Patient>>(
    "/reception",
    getHeaders(token)
  );

  return data.data;
};

export const postCredential = async (credential: Credential, token: string) => {
  const { data } = await axios.post<ApiResponse<Patient>>(
    "/patients",
    {
      accessToken: (credential as any).accessToken,
      accessTokenSecret: (credential as any).secret,
    },
    getHeaders(token)
  );

  return data.data;
};
