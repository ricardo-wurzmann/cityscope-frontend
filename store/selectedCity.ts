import { create } from "zustand";

interface SelectedCityState {
  cityId: number | null;
  setCity: (id: number) => void;
}

export const useSelectedCity = create<SelectedCityState>((set) => ({
  cityId: null,
  setCity: (id: number) => set({ cityId: id }),
}));

