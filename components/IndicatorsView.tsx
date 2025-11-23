"use client";

import { useQuery } from "@tanstack/react-query";
import { getIndicators } from "@/lib/services/indicatorService";
import { useSelectedCity } from "@/store/selectedCity";
import { IndicatorRow } from "@/lib/zod-schemas";

export default function IndicatorsView() {
  const { cityId } = useSelectedCity();

  const {
    data: indicators = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["indicators", cityId],
    queryFn: () => getIndicators(cityId!),
    enabled: !!cityId,
  });

  if (!cityId) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">Select a city</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
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
        <p className="text-rose-600">Error loading indicators. Please try again.</p>
      </div>
    );
  }

  if (indicators.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-slate-500">No indicators available for this city</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Indicator
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Year
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Value
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700">
                Unit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {indicators.map((indicator: IndicatorRow, index: number) => (
              <tr key={`${indicator.indicator}-${indicator.year}-${index}`} className="hover:bg-slate-50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900">
                  {indicator.indicator}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {indicator.year}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-700">
                  {indicator.value}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                  {indicator.unit || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

