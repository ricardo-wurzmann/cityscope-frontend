import { z } from "zod";

export const City = z.object({
  id: z.number(),
  name: z.string(),
  uf: z.string()
});

export type City = z.infer<typeof City>;

export const IndicatorRow = z.object({
  indicator: z.string(),
  name: z.string(),
  unit: z.string(),
  year: z.number(),
  value: z.number()
});

export type IndicatorRow = z.infer<typeof IndicatorRow>;

