import { api } from "@/lib/api";

export async function getIndicators(cityId: number) {
  const { data } = await api.get(`/cities/${cityId}/indicators`);
  return data;
}

