export function getLoggedInToken() {
  const loggedInToken = localStorage.getItem("jobPortalToken");
  return loggedInToken;
}
