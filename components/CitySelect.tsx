"use client";

import { useQuery } from "@tanstack/react-query";
import { getCities } from "@/lib/services/cityService";
import { City } from "@/lib/zod-schemas";
import { useSelectedCity } from "@/store/selectedCity";

export default function CitySelect() {
  const { cityId, setCity } = useSelectedCity();

  const { data: cities = [], isLoading, error } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    if (id) {
      setCity(id);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-slate-500">Loading cities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-4 shadow-sm">
        <p className="text-sm text-rose-600">Error loading cities. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Select City
      </label>
      <select
        value={cityId || ""}
        onChange={handleChange}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        <option value="">Select a city</option>
        {cities.map((city: City) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

