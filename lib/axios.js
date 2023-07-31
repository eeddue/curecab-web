import axios from "axios";
export const url = "https://curecab-api.vercel.app/api/v1";

export const fetcher = axios.create({
  baseURL: "https://curecab-api.vercel.app/api/v1",
});
