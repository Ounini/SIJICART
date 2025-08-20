import { clearAuth, setAuth } from "./authCache";
import { justUrl } from "../utils/url";
import Cookies from "js-cookie";

export const refreshAccessToken = async () => {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) return null;

    const response = await justUrl.post("/auth/refresh-token", {});

    const { accessToken, user } = response.data;

    setAuth(accessToken, user);
    return user;
  } catch (error) {
    clearAuth();
    Cookies.remove("refreshToken");
    console.error(error);
    return null;
  }
};
