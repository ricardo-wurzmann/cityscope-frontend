"use client";

import { useQuery } from "@tanstack/react-query";
import { indicatorService } from "../services/indicatorService";
import { IndicatorRow } from "@/lib/zod-schemas";

type IndicatorsViewProps = {
  cityId: number | null;
};

export default function IndicatorsView({ cityId }: IndicatorsViewProps) {
  const {
    data: indicators = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["indicators", cityId],
    queryFn: () => indicatorService.getIndicatorsByCity(cityId!),
    enabled: !!cityId,
  });

  const formatValue = (value: number, unit: string) => {
    if (unit === "%") {
      return `${value.toFixed(2)}%`;
    }
    if (unit === "R$") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }
    return new Intl.NumberFormat("pt-BR").format(value);
  };

  if (!cityId) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">Selecione uma cidade para visualizar os indicadores</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-2 h-4 w-1/3 rounded bg-slate-200"></div>
              <div className="h-10 w-full rounded bg-slate-100"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-rose-200 bg-rose-50 p-6 text-center shadow-sm">
        <p className="text-rose-600">
          Erro ao carregar indicadores. Tente novamente.
        </p>
      </div>
    );
  }

  if (indicators.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">Nenhum indicador disponível para esta cidade</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Indicadores</h2>
        <p className="mt-1 text-sm text-slate-600">
          {indicators.length} indicador(es) encontrado(s)
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Indicador
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Ano
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Unidade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {indicators.map((indicator: IndicatorRow, index: number) => (
              <tr key={`${indicator.indicator}-${indicator.year}-${index}`} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                  {indicator.indicator}
                </td>
                <td className="px-6 py-4 text-sm text-slate-700">{indicator.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {indicator.year}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-900">
                  {formatValue(indicator.value, indicator.unit)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {indicator.unit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

