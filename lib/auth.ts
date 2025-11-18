import { api, setAccessToken } from "./api";

export async function signup(email: string, password: string) {
  const { data } = await api.post("/auth/signup", { email, password });
  setAccessToken(data.access_token);
}

export async function login(email: string, password: string) {
  const { data } = await api.post("/auth/login", { email, password });
  setAccessToken(data.access_token);
}

export async function logout() {
  await api.post("/auth/logout");
  setAccessToken(null);
}

