import { AxiosError } from "axios";
import useSWR from "swr";
import { ApiResponse } from "~/types/api";
import { Area, AreaObject } from "~/types/exhibition";
import axios from "~/utils/axios";

const getObjects = () =>
  axios
    .get<ApiResponse<{ [key in Area]: AreaObject[] }>>("/admin/entries/objects")
    .then(({ data }) => data);

export const useObjects = (area: Area) => {
  const { data, error } = useSWR<
    ApiResponse<{ [key in Area]: AreaObject[] }>,
    AxiosError
  >("/admin/entries/objects", getObjects);

  return {
    error,
    objects: data?.data[area],
  };
};
