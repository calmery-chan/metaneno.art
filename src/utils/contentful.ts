import { get } from "./fetch";
import { WorksResponse } from "~/types/contentful";

export const getWorks = (): Promise<WorksResponse> =>
  get("/admin/contentful/works").then((response) => response.json());
