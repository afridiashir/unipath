import axios from "axios";
import { useAuthStore } from "@/stores/auth.store";
import { useMemo } from "react";

const BASE_URL = import.meta.env.VITE_API_ROUTE;

export const useApi = () => {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
        ...(user?.token && {
          Authorization: `Bearer ${user.token}`,
        }),
      },
    });

    // ✅ RESPONSE INTERCEPTOR
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        const status = error?.response?.status;

        if (status === 401) {
          // Token expired or unauthorized
          logout();
          window.location.href = "/login";
        }

        return Promise.reject(error);
      },
    );

    return instance;
  }, [user?.token, logout]);

  return api;
};

export const useApiWithoutAuth = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};
