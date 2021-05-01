import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../index";

import { tokenConfig, config } from "../../../helperfuncs/token";
import { axiosInstance } from "../../../services/axios";
import { localBrowserStorage } from "../../../services/browserStorage";

export const loadUser = () => async (dispatch) => {
  dispatch({ type: USER_LOADING });

  axiosInstance
    .get("/auth/user")
    .then((user) =>
      dispatch({
        type: USER_LOADED,
        payload: user.data,
      })
    )
    .catch(() => dispatch({ type: AUTH_ERROR }));
};

export const loadUserWhenAlreadyLoggedIn = () => async (dispatch, getState) => {
  axiosInstance
    .get(`/auth/user/`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch(() => dispatch({ type: AUTH_ERROR }));
};

// LOGIN USER
export const loginUser = (user) => (dispatch) => {
  const body = user;
  axiosInstance
    .post(`/auth/login/`, body, config)
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
            profile_owner: res.data.profile_owner,
          },
        },
      });
    })
    .catch((err) => {
      const { error } = err?.response?.data;
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
    axiosInstance
      .post(
        `/auth/logout/`,
        {
          refresh: token_refresh,
        },
        tokenConfig(getState)
      )
      .then(() => {
        localBrowserStorage.clearTokensAndRole();
        dispatch({ type: LOGOUT_SUCCESS });
        setTimeout(() => {
          window.location.reload();
        }, 200);
      })
      .catch(() => {
        dispatch({ type: LOGOUT_FAILED });
      });
  }
};
