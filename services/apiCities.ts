import { api } from "@/lib/api";

export interface State {
  uf: string;
  name?: string;
}

export interface City {
  id: number;
  name: string;
  uf: string;
  region?: string;
}

export interface CityDetails {
  id: number;
  name: string;
  uf: string;
  region?: string;
  area?: number;
}

export const apiCities = {
  fetchStates: async (): Promise<State[]> => {
    const res = await api.get("/states");
    return res.data;
  },

  fetchCitiesByState: async (uf: string): Promise<City[]> => {
    const res = await api.get(`/states/${uf}/cities`);
    return res.data;
  },

  fetchCityDetails: async (id: number): Promise<CityDetails> => {
    const res = await api.get(`/cities/${id}/details`);
    return res.data;
  },
};

