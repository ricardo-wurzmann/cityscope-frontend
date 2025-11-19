import { api } from "@/lib/api";
import { IndicatorRow } from "@/lib/zod-schemas";

export const indicatorService = {
  getIndicatorsByCity: async (cityId: number): Promise<IndicatorRow[]> => {
    const response = await api.get(`/cities/${cityId}/indicators`);
    return response.data;
  },
};

