const xx_auth_token_storage_key = "jobPortalToken";

export function getLoggedInToken() {
  const loggedInToken = localStorage.getItem(xx_auth_token_storage_key);
  return loggedInToken;
}
