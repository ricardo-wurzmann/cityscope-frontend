import { api } from "@/lib/api";

export async function getCities() {
  const { data } = await api.get("/cities");
  return data;
}

