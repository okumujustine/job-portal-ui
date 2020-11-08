import axios from "axios";
import { baseUrl, authTokenKey } from "../features/common/constants";
import { csrftoken } from "./token";

const token = localStorage.getItem(authTokenKey);

export let axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    "X-CSRFtoken": csrftoken,
    Authorization: `Bearer ${token}`,
  },
});
