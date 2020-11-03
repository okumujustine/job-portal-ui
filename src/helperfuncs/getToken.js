import { authTokenKey } from "../features/common/constants";

export function getLoggedInToken() {
  const loggedInToken = localStorage.getItem(authTokenKey);
  return loggedInToken;
}
