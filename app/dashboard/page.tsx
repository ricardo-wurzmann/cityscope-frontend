"use client";

import { useState } from "react";
import CitySelect from "@/components/CitySelect";
import Charts from "@/components/Charts";

export default function Dashboard() {
  const [cityId, setCityId] = useState<number>(0);

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">CityScope</h1>
      <CitySelect onSelect={setCityId} />
      {cityId ? (
        <Charts cityId={cityId} />
      ) : (
        <p className="mt-4 text-gray-600">Selecione uma cidade…</p>
      )}
    </main>
  );
}
