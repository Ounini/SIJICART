import axios from "axios";

export const justUrl = axios.create({
  baseURL: "http://localhost:2468",
});
