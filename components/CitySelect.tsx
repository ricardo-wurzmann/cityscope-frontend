"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { City } from "@/lib/zod-schemas";

type CitySelectProps = {
  onSelect: (cityId: number) => void;
};

const STATES = [
  "AC",
  "AL",
  "AM",
  "AP",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MG",
  "MS",
  "MT",
  "PA",
  "PB",
  "PE",
  "PI",
  "PR",
  "RJ",
  "RN",
  "RO",
  "RR",
  "RS",
  "SC",
  "SE",
  "SP",
  "TO"
];

export default function CitySelect({ onSelect }: CitySelectProps) {
  const [uf, setUf] = useState("SP");
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    api.get(`/cities?uf=${uf}`).then((response) => setCities(response.data));
  }, [uf]);

  return (
    <div className="flex gap-2">
      <select
        value={uf}
        onChange={(event) => setUf(event.target.value)}
        className="rounded border p-2"
      >
        {STATES.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        onChange={(event) => onSelect(Number(event.target.value))}
        className="rounded border p-2"
      >
        <option>Selecione a cidade</option>
        {cities.map((city) => (
          <option key={city.id} value={city.id}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

