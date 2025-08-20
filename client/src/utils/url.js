import axios from "axios";

export const justUrl = axios.create({
  baseURL: "https://sijicart.onrender.com",
  withCredentials: true,
});
