"use client";

import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { api } from "@/lib/api";
import { IndicatorRow } from "@/lib/zod-schemas";

type ChartsProps = {
  cityId: number;
};

export default function Charts({ cityId }: ChartsProps) {
  const [rows, setRows] = useState<IndicatorRow[]>([]);

  useEffect(() => {
    if (!cityId) return;
    api.get(`/cities/${cityId}/indicators`).then((response) => setRows(response.data));
  }, [cityId]);

  const populationSeries = rows
    .filter((row) => row.indicator === "POP")
    .sort((a, b) => a.year - b.year);

  return (
    <div className="mt-6">
      <h3 className="mb-2 font-semibold">População (exemplo)</h3>
      <LineChart width={800} height={320} data={populationSeries}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" />
      </LineChart>
    </div>
  );
}

