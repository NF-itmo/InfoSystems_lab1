import { useSyncExternalStore } from "react";
import { getCoordinatesList } from "../api/coordinates-api";
import type { Coordinates } from "./types";

let coordinates: Coordinates[] = [];
let initialization: Promise<void> | null = null;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useCoordinates = () => useSyncExternalStore(subscribe, () => coordinates);

export const initializeCoordinates = (): Promise<void> => {
  if (!initialization) {
    initialization = getCoordinatesList()
      .then((loadedCoordinates) => {
        coordinates = loadedCoordinates;
        notify();
      })
      .catch((error) => {
        initialization = null;
        throw error;
      });
  }
  return initialization;
};

export const upsertCoordinates = (coordinatesItem: Coordinates) => {
  coordinates = [
    ...coordinates.filter((item) => item.id !== coordinatesItem.id),
    coordinatesItem,
  ];
  notify();
};

export const removeCoordinates = (id: number) => {
  coordinates = coordinates.filter((coordinatesItem) => coordinatesItem.id !== id);
  notify();
};
