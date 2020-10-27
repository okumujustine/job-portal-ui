function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie("csrftoken");

export const config = {
  headers: {
    "Content-Type": "application/json",
    "X-CSRFtoken": csrftoken,
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
