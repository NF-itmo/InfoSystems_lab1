import { useSyncExternalStore } from "react";
import { getBookCreatures } from "../api/book-creatures-api";
import type { BookCreature, BookCreatureFilters } from "./types";

let bookCreatures: BookCreature[] = [];
let initialization: Promise<void> | null = null;
const listeners = new Set<() => void>();

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  
  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => bookCreatures;

export const useBookCreatures = () => useSyncExternalStore(subscribe, getSnapshot);

export const loadBookCreatures = async (
  filters: BookCreatureFilters = {},
): Promise<void> => {
  const loadedBookCreatures = await getBookCreatures(filters);

  bookCreatures = loadedBookCreatures;
  notify();
};

export const initializeBookCreatures = (): Promise<void> => {
  if (!initialization) {
    initialization = loadBookCreatures()
      .catch((error) => {
        initialization = null;
        throw error;
      });
  }

  return initialization;
};

export const upsertBookCreature = (bookCreature: BookCreature) => {
  bookCreatures = [
    ...bookCreatures.filter((item) => item.id !== bookCreature.id),
    bookCreature,
  ];
  notify();
};

export const removeBookCreature = (id: number) => {
  bookCreatures = bookCreatures.filter((bookCreature) => bookCreature.id !== id);
  notify();
};
