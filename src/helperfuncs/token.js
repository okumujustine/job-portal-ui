export const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const appTokenConfig = (token) => {
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

export const tokenConfig = (getState) => {
  const jobPortalToken = getState().AuthReducer.jobPortalToken;
  if (jobPortalToken) {
    config.headers["Authorization"] = "Bearer " + jobPortalToken;
  }
  return config;
};

export const refreshTokenConfig = (getState) => {
  const token_refresh = getState().AuthReducer.jobPortalRefreshToken;
  if (token_refresh) {
    config.headers["Authorization"] = "Bearer " + token_refresh;
  }
  return config;
};
