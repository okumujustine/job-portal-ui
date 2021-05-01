import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../../actions";
import {
  authTokenKey,
  refreshTokenKey,
  userRoleKey,
} from "../../../features/common/constants";
import { localBrowserStorage } from "../../../services/browserStorage";

const initialState = {
  jobPortalToken: localStorage.getItem(authTokenKey),
  jobPortalRefreshToken: localStorage.getItem(refreshTokenKey),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  logout: null,
  role: localStorage.getItem(userRoleKey),
  loginFailedError: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isAuthenticated: null,
        isLoading: true,
      };

    case USER_LOADED:
      localBrowserStorage.setUserRole(action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        role: action.payload.role,
      };

    case LOGIN_FAILED:
      localBrowserStorage.clearTokensAndRole();
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        loginFailedError: action.payload.erroMessage,
      };

    case AUTH_ERROR:
      localBrowserStorage.clearTokensAndRole();
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };

    case LOGOUT_SUCCESS:
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        logout: "sucess",
      };

    case LOGOUT_FAILED:
      return {
        logout: "failed",
      };

    case LOGIN_SUCCESS:
      localBrowserStorage.setAccessToken(action.payload.jobPortalToken);
      localBrowserStorage.setRefreshToken(action.payload.jobPortalRefreshToken);
      localBrowserStorage.setUserRole(action.payload.user.role);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        role: action.payload.user.role,
        loginFailedError: null,
      };

    case REFRESH_TOKEN_SUCCESS:
      localBrowserStorage.setAccessToken(action.payload.jobPortalToken);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    default:
      return state;
  }
};
