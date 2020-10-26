import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REFRESH_TOKEN_SUCCESS,
} from "../../actions";

const initialState = {
  jobPortalToken: localStorage.getItem("jobPortalToken"),
  jobPortalRefreshToken: localStorage.getItem("jobPortalRefreshToken"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  role: localStorage.getItem("jobPortalUserRole"),
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
      localStorage.setItem("jobPortalUserRole", action.payload.role);
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        role: action.payload.role,
      };
    case LOGIN_FAILED:
      localStorage.removeItem("jobPortalToken");
      localStorage.removeItem("jobPortalRefreshToken");
      localStorage.removeItem("jobPortalUserRole");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
        loginFailedError: action.payload.erroMessage,
      };
    case AUTH_ERROR:
      localStorage.removeItem("jobPortalToken");
      localStorage.removeItem("jobPortalRefreshToken");
      return {
        token: null,
        isAuthenticated: false,
        isLoading: false,
        user: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("jobPortalToken", action.payload.jobPortalToken);
      localStorage.setItem(
        "jobPortalRefreshToken",
        action.payload.jobPortalRefreshToken
      );
      localStorage.setItem("jobPortalUserRole", action.payload.user.role);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        role: action.payload.user.role,
        loginFailedError: null,
      };
    case REFRESH_TOKEN_SUCCESS:
      localStorage.setItem("jobPortalToken", action.payload.jobPortalToken);
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
