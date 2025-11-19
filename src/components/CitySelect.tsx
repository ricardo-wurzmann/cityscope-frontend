"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { cityService } from "../services/cityService";
import { City } from "@/lib/zod-schemas";

type CitySelectProps = {
  onSelect: (cityId: number | null) => void;
  selectedCityId?: number | null;
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

export default function CitySelect({ onSelect, selectedCityId }: CitySelectProps) {
  const [uf, setUf] = useState<string>("");
  const [searchName, setSearchName] = useState<string>("");

  const { data: cities = [], isLoading, error } = useQuery({
    queryKey: ["cities", { uf, name: searchName }],
    queryFn: () => cityService.getCities({ uf: uf || undefined, name: searchName || undefined }),
    enabled: true,
  });

  const filteredCities = useMemo(() => {
    return cities;
  }, [cities]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value ? Number(event.target.value) : null;
    onSelect(cityId);
  };

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Buscar por nome
          </label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Digite o nome da cidade..."
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>

        <div className="sm:w-32">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Filtrar por UF
          </label>
          <select
            value={uf}
            onChange={(e) => setUf(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          >
            <option value="">Todas</option>
            {STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <div className="py-4 text-center text-sm text-slate-500">
          Carregando cidades...
        </div>
      )}

      {error && (
        <div className="rounded-md bg-rose-50 p-3 text-sm text-rose-600">
          Erro ao carregar cidades. Tente novamente.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <div className="text-sm text-slate-600">
            {filteredCities.length > 0 ? (
              <span>{filteredCities.length} cidade(s) encontrada(s)</span>
            ) : (
              <span>Nenhuma cidade encontrada</span>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Selecione a cidade
            </label>
            <select
              value={selectedCityId || ""}
              onChange={handleCityChange}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              disabled={isLoading || filteredCities.length === 0}
            >
              <option value="">Selecione uma cidade</option>
              {filteredCities.map((city: City) => (
                <option key={city.id} value={city.id}>
                  {city.name}, {city.uf}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}

