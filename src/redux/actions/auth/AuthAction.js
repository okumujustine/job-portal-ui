import axios from "axios";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../index";

import { tokenConfig, config } from "../../../helperfuncs/token";

export const loadUser = () => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  await dispatch(checkTokenExpiry());

  axios
    .get("http://127.0.0.1:8000/auth/user/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({ type: AUTH_ERROR });
    });
};

export const loadUserWhenAlreadyLoggedIn = () => async (dispatch, getState) => {
  await dispatch(checkTokenExpiry());
  axios
    .get("http://127.0.0.1:8000/auth/user/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({ type: AUTH_ERROR });
    });
};

export const checkTokenExpiry = () => async (dispatch, getState) => {
  const auth_token = getState().AuthReducer.jobPortalToken;

  if (!auth_token) {
    return;
  }

  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/auth/verify/token/",
      { token: auth_token },
      tokenConfig(getState)
    );
    const { data } = await res;
    return data.success;
  } catch {
    const refresh_token = getState().AuthReducer.jobPortalRefreshToken;
    if (!refresh_token) {
      dispatch({ type: AUTH_ERROR });
      return false;
    }
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/auth/refresh/token/",
        { refresh: refresh_token }
      );

      await dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: { jobPortalToken: res.data.access },
      });
      return true;
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  }
};

// LOGIN USER
export const loginUser = (user) => (dispatch) => {
  const body = user;
  axios
    .post("http://127.0.0.1:8000/auth/login/", body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          jobPortalToken: res.data.tokens.access,
          jobPortalRefreshToken: res.data.tokens.refresh,
          user: {
            id: res.data.id,
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            phone: res.data.phone,
            role: res.data.role,
          },
        },
      });
    })
    .catch((err) => {
      const { error } = err.response.data;

      dispatch({
        type: LOGIN_FAILED,
        payload: { erroMessage: error },
      });
    });
};

export const logoutUser = () => (dispatch, getState) => {
  const job_portal_token = getState().AuthReducer.jobPortalToken;
  const token_refresh = getState().AuthReducer.jobPortalRefreshToken;

  if (job_portal_token && token_refresh) {
    axios
      .post(
        "http://127.0.0.1:8000/auth/logout/",
        {
          refresh: token_refresh,
        },
        tokenConfig(getState)
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("jobPortalToken");
        localStorage.removeItem("jobPortalRefreshToken");
        dispatch({ type: LOGOUT_SUCCESS });
        setTimeout(() => (window.location = "/"), 2000);
      })
      .catch((error) => {
        console.log("logout failed");
      });
  }
};
