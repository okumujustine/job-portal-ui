import axios from "axios";
import NProgress from "nprogress";

import { baseUrl } from "../features/common/constants";
import { localBrowserStorage } from "./browserStorage";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 600000,
});

NProgress.configure({ easing: "ease", speed: 500 });

axiosInstance.interceptors.request.use(
  (config) => {
    NProgress.start();

    const token = localBrowserStorage.getAccessToken();
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
    const refreshToken = localBrowserStorage.getRefreshToken() || "wrongtoken";

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
            localBrowserStorage.setAccessToken(res.data.access);

            axios.defaults.headers.common["Authorization"] =
              "Bearer " + localBrowserStorage.getAccessToken();

            return axiosInstance(originalRequest);
          }
          NProgress.done();
        })
        .catch((error) => {
          NProgress.done();

          const pathName = window.location.pathname;
          const paths = ["/home", "/jobs", "/about", "/signup", "/login"];

          if (paths.indexOf(pathName) <= -1) {
            window.location.href = "/";
          }
          return Promise.reject(error);
        });
    }
    NProgress.done();
    return Promise.reject(error);
  }
);
