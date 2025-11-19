import { api } from "@/lib/api";

export const authService = {
  signup: async (email: string, password: string) => {
    const res = await api.post("/auth/signup", { email, password });
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    return res.data; // backend retorna access_token
  },

  logout: async () => {
    await api.post("/auth/logout");
  },
};
