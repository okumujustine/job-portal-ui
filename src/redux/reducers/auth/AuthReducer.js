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

const xx_auth_token_storage_key = "jobPortalToken";
const xx_refresh_token_storage_key = "jobPortalRefreshToken";
const xx_user_role_storage_key = "jobPortalUserRole";

const initialState = {
  jobPortalToken: localStorage.getItem(xx_auth_token_storage_key),
  jobPortalRefreshToken: localStorage.getItem(xx_refresh_token_storage_key),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  logout: null,
  role: localStorage.getItem(xx_user_role_storage_key),
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
      localStorage.setItem(xx_user_role_storage_key, action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        role: action.payload.role,
      };
    case LOGIN_FAILED:
      localStorage.removeItem(xx_auth_token_storage_key);
      localStorage.removeItem(xx_refresh_token_storage_key);
      localStorage.removeItem(xx_user_role_storage_key);
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        loginFailedError: action.payload.erroMessage,
      };
    case AUTH_ERROR:
      localStorage.removeItem(xx_auth_token_storage_key);
      localStorage.removeItem(xx_refresh_token_storage_key);
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
      localStorage.setItem(
        xx_auth_token_storage_key,
        action.payload.jobPortalToken
      );
      localStorage.setItem(
        xx_refresh_token_storage_key,
        action.payload.jobPortalRefreshToken
      );
      localStorage.setItem(xx_user_role_storage_key, action.payload.user.role);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        role: action.payload.user.role,
        loginFailedError: null,
      };
    case REFRESH_TOKEN_SUCCESS:
      localStorage.setItem(
        xx_auth_token_storage_key,
        action.payload.jobPortalToken
      );
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
