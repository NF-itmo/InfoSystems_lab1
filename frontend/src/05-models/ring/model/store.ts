import { useSyncExternalStore } from "react";
import { getRings } from "../api/ring-api";
import type { Ring } from "./types";

let rings: Ring[] = [];
let initialization: Promise<void> | null = null;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export const useRings = () => useSyncExternalStore(subscribe, () => rings);

export const loadRings = async (): Promise<void> => {
  rings = await getRings();
  notify();
};

export const initializeRings = (): Promise<void> => {
  if (!initialization) {
    initialization = loadRings()
      .catch((error) => {
        initialization = null;
        throw error;
      });
  }
  return initialization;
};

export const upsertRing = (ring: Ring) => {
  rings = [...rings.filter((item) => item.name !== ring.name), ring];
  notify();
};

export const removeRing = (name: string) => {
  rings = rings.filter((ring) => ring.name !== name);
  notify();
};
