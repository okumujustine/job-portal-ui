import axios from "axios";
import NProgress from "nprogress";

import { baseUrl } from "../features/common/constants";
import { LocalStorageService } from "./localStorage";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 600000,
});

NProgress.configure({ easing: "ease", speed: 500 });

const localStorageService = LocalStorageService.getService();

axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start();

    const token = localStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    const refreshToken = localStorageService.getRefreshToken() || "wrongtoken";

    if (
      error.response.status === 401 &&
      originalRequest.url === "/auth/refresh/token/"
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axiosInstance
        .post("/auth/refresh/token/", {
          refresh: refreshToken,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorageService.setAccessToken(res.data.access);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorageService.getAccessToken();

            return axiosInstance(originalRequest);
          }
          NProgress.done();
        })
        .catch((error) => {
          NProgress.done();
          return Promise.reject(error);
        });
    }
    NProgress.done();
    return Promise.reject(error);
  }
);
