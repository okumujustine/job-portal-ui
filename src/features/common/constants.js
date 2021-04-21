export const authTokenKey = "xxxx-auth-token";
export const refreshTokenKey = "xxxx-refresh-token";
export const userRoleKey = "xxxx-user-role";

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://listings-jobs.herokuapp.com"
    : "http://localhost:8000";
