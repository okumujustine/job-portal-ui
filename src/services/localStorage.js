import {
  authTokenKey,
  refreshTokenKey,
  userRoleKey,
} from "../features/common/constants";

export const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setAccessToken(token) {
    localStorage.setItem(authTokenKey, token);
  }

  function _setRefreshToken(token) {
    localStorage.setItem(refreshTokenKey, token);
  }

  function _setUserRole(role) {
    localStorage.setItem(userRoleKey, role);
  }

  function _getAccessToken() {
    return localStorage.getItem(authTokenKey);
  }

  function _getRefreshToken() {
    return localStorage.getItem(refreshTokenKey);
  }

  function _getUserRole() {
    localStorage.getItem(userRoleKey);
  }

  function _clearTokensAndRole() {
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(refreshTokenKey);
    localStorage.removeItem(userRoleKey);
  }

  return {
    getService: _getService,

    setAccessToken: _setAccessToken,
    setRefreshToken: _setRefreshToken,
    setUserRole: _setUserRole,

    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    getUserRole: _getUserRole,

    clearTokensAndRole: _clearTokensAndRole,
  };
})();
