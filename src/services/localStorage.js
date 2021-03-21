import { authTokenKey, refreshTokenKey } from "../features/common/constants";

export const LocalStorageService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setToken(tokenObj) {
    localStorage.setItem(authTokenKey, tokenObj.access_token);
    localStorage.setItem(refreshTokenKey, tokenObj.refresh_token);
  }

  function _setRefresToken(token) {
    localStorage.setItem(refreshTokenKey, token);
  }

  function _setAccessToken(token) {
    localStorage.setItem(authTokenKey, token);
  }

  function _getAccessToken() {
    return localStorage.getItem(authTokenKey);
  }

  function _getRefreshToken() {
    return localStorage.getItem(refreshTokenKey);
  }

  function _clearToken() {
    localStorage.removeItem(authTokenKey);
    localStorage.removeItem(refreshTokenKey);
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
    setRefresToken: _setRefresToken,
    setAccessToken: _setAccessToken,
  };
})();
