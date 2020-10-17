import axios from "axios";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN_SUCCESS,
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
    console.log("data", "refresh failed");
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
            email: res.data.email,
            first_name: res.data.first_name,
            last_name: res.data.last_name,
            phone: res.data.phone,
          },
        },
      });
      // window.location.href = "/";
    })
    .catch((error) => {
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};
