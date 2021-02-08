import useSWR from "swr";
import { getWorks } from "./contentful";

export const useWorks = () => {
  const { data, error } = useSWR("works", getWorks);
  return { works: data ? (data.data as any).meadow : null, error };
};
