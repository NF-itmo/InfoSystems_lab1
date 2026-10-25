import { useSyncExternalStore } from "react";
import { getMagicCities } from "../api/magic-city-api";
import type { MagicCity } from "./types";

let magicCities: MagicCity[] = [];
let initialization: Promise<void> | null = null;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useMagicCities = () => useSyncExternalStore(subscribe, () => magicCities);

export const loadMagicCities = async (): Promise<void> => {
  magicCities = await getMagicCities();
  notify();
};

export const initializeMagicCities = (): Promise<void> => {
  if (!initialization) {
    initialization = loadMagicCities()
      .catch((error) => {
        initialization = null;
        throw error;
      });
  }
  return initialization;
};

export const upsertMagicCity = (magicCity: MagicCity) => {
  magicCities = [...magicCities.filter((item) => item.name !== magicCity.name), magicCity];
  notify();
};

export const removeMagicCity = (name: string) => {
  magicCities = magicCities.filter((magicCity) => magicCity.name !== name);
  notify();
};
