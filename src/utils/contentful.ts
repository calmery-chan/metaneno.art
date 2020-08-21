import axios from "./axios";
import { Works } from "~/types/contentful";

export const getWorks = (): Promise<Works> =>
  axios.get("/admin/contentful/works").then(({ data }) => data);
