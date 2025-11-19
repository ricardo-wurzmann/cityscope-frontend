import { api } from "@/lib/api";
import { City } from "@/lib/zod-schemas";

export type GetCitiesParams = {
  name?: string;
  uf?: string;
};

export const cityService = {
  getCities: async (params?: GetCitiesParams): Promise<City[]> => {
    const queryParams = new URLSearchParams();
    
    if (params?.name) {
      queryParams.append("name", params.name);
    }
    
    if (params?.uf) {
      queryParams.append("uf", params.uf);
    }

    const queryString = queryParams.toString();
    const url = `/cities${queryString ? `?${queryString}` : ""}`;
    
    const response = await api.get(url);
    return response.data;
  },
};

