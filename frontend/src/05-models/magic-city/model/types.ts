import type { BookCreatureType } from "@/05-models/book-creatures/model/types";

export type MagicCity = {
  name: string;
  area: number;
  population: number;
  establishmentDate?: string;
  governor: BookCreatureType;
  capital: boolean;
  populationDensity: number;
};
