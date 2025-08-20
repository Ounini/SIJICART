let authToken = null;
let currentUser = null;

export const setAuth = (token, user) => {
  authToken = token;
  currentUser = user;
};

export const getAuthToken = () => authToken;

export const getCurrentUser = () => currentUser;

export const clearAuth = () => {
  authToken = null;
  currentUser = null;
};
