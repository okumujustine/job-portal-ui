export const authTokenKey = "xxxx-auth-token";
export const refreshTokenKey = "xxxx-refresh-token";
export const userRoleKey = "xxxx-user-role";

const localUrl = "http://localhost:8000";
const prodUrl = "https://listings-jobs.herokuapp.com";
export const baseUrl =
  process.env.NODE_ENV === "production" ? prodUrl : localUrl;
