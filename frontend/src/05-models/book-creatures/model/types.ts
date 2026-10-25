import type { Coordinates } from "@/05-models/coordinates/model/types";
import type { MagicCity } from "@/05-models/magic-city/model/types";
import type { Ring } from "@/05-models/ring/model/types";

export type BookCreatureType = "HOBBIT" | "ELF" | "HUMAN";

export type BookCreature = {
  id: number;
  name: string;
  coordinates: Coordinates;
  creationDate: string;
  age: number;
  creatureType: BookCreatureType;
  creatureLocation?: MagicCity;
  attackLevel: number;
  defenseLevel: number;
  ring?: Ring;
};

export type BookCreatureFilters = {
  page?: number;
  size?: number;
  name?: string;
};

export type BookCreatureWriteRequest = {
  name: string;
  coordinatesId: number;
  age: number;
  creatureType: BookCreatureType;
  creatureLocationName?: string;
  attackLevel: number;
  defenseLevel: number;
  ringName?: string;
};

export type CreateBookCreatureResponse = {
  id: number;
};

export type AverageDefenseLevelResponse = {
  averageDefenseLevel: number | null;
};

export type RingCountResponse = {
  count: number;
};

export type TakeRingsFromHobbitsResponse = {
  affectedCount: number;
};
