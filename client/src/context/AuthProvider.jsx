import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

import { setUser, clearUser } from "../features/user/userSlice";
import { clearAuth, setAuth } from "../middleware/authCache";
import { refreshAccessToken } from "../middleware/refreshAccessToken";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const userLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        const user = await refreshAccessToken();
        if (user) {
          dispatch(setUser(user));
        } else {
          dispatch(clearUser());
          Cookies.remove("refreshToken");
        }
      } else {
        dispatch(clearUser());
      }
      setLoading(false);
    };

    initializeAuth();

    const interval = setInterval(async () => {
      const user = await refreshAccessToken();
      if (user) {
        dispatch(setUser(user));
      }
    }, 600000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const login = (accessToken, user) => {
    setAuth(accessToken, user);
    Cookies.set("refreshToken", accessToken, { expires: 1 });
    dispatch(setUser(user));
  };

  const logout = () => {
    clearAuth();
    Cookies.remove("refreshToken");
    dispatch(clearUser());
  };

  return (
    <AuthContext.Provider
      value={{ userLoggedIn, login, logout, currentUser, isAdmin, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
