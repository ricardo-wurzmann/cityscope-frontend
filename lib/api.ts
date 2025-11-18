import axios, { AxiosRequestConfig } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type RetryableAxiosRequestConfig = AxiosRequestConfig & { _retry?: boolean };

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

let isRefreshing = false;
let pendingResolvers: Array<() => void> = [];

function onRefreshed() {
  pendingResolvers.forEach((resolve) => resolve());
  pendingResolvers = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        await new Promise<void>((resolve) => pendingResolvers.push(resolve));
        originalRequest._retry = true;
        return api(originalRequest);
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const accessToken = refreshResponse.data.access_token;
        if (accessToken) {
          api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        }
        onRefreshed();
        originalRequest._retry = true;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export function setAccessToken(token: string | null) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

