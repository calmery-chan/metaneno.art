import axios from "./axios";
import { WorksResponse } from "~/types/contentful";

export const getWorks = (): Promise<WorksResponse> =>
  axios.get("/admin/contentful/works").then(({ data }) => data);
