import { api } from "@/lib/api";

export async function getCities(page = 1, limit = 50) {
  const res = await api.get(`/cities?page=${page}&limit=${limit}`);
  return res.data;
}

